// routes/order.js
const express = require("express");
const router = express.Router();
const Order = require("../models/Order");
const Item = require("../models/Item");
const DrinkAndFries = require("../models/DrinkAndFries");
const Sauce = require("../models/Sauce");
const OrderConfig = require("../models/OrderConfig");
const { auth, admin, guest } = require("../middleware/auth");
const multer = require("multer");
const nodemailer = require("nodemailer");
const mongoose = require("mongoose");

const upload = multer();

router.use(upload.none());

// Middleware to parse form-data
router.use(express.urlencoded({ extended: true }));

// POST /api/orders - Create a new order
router.post("/", guest, async (req, res) => {
  try {
    // Parse items from form-data as JSON
    const items = JSON.parse(req.body.items);

    let totalAmount = 0;

    for (const item of items) {
      // Fetch item details
      const itemDoc = await Item.findById(item._id);
      if (!itemDoc) {
        return res
          .status(404)
          .json({ message: `Item ${item.name} not found.` });
      }

      // Calculate item price (item price * quantity)
      let itemTotal = item.price * item.quantity;
      // Add step1Options (option) price (if any)
      if (item.option) {
        const step1Option = itemDoc.step1Options.find(
          (opt) => opt._id.toString() === item.option._id
        );
        if (!step1Option) {
          return res.status(404).json({
            message: `Step 1 option not found for item ${item.name}.`,
          });
        }
        itemTotal += parseFloat(step1Option.price || 0) * item.quantity;
      }

      // Add step2Options (optionTwo) price (if any)
      if (item.optionsTwo) {
        const step2Option = itemDoc.step2Options.find(
          (opt) => opt._id.toString() === item.optionsTwo._id
        );
        if (!step2Option) {
          return res.status(404).json({
            message: `Step 2 option not found for item ${item.name}.`,
          });
        }
        itemTotal += parseFloat(step2Option.price || 0) * item.quantity;
      }
      // Add drinks prices (if any)
      if (item.drinks && Array.isArray(item.drinks)) {
        for (const drinkId of item.drinks) {
          const drink = await DrinkAndFries.findById(drinkId);
          if (!drink) {
            return res
              .status(404)
              .json({ message: `Drink with ID ${drinkId} not found.` });
          }
          itemTotal += drink.price * item.quantity; // Add drink price for the quantity of this item
        }
      }

      // Add sauce prices (if any)
      if (item.sauces && Array.isArray(item.sauces)) {
        for (const sauceId of item.sauces) {
          const sauce = await Sauce.findById(sauceId);
          if (!sauce) {
            return res
              .status(404)
              .json({ message: `Sauce with ID ${sauceId} not found.` });
          }
          itemTotal += sauce.price * item.quantity; // Add sauce price for the quantity of this item
        }
      }

      // Add the total price of this item (including addons) to totalAmount
      totalAmount += itemTotal;
    }

    // Fetch the current order limit (maxOrdersPerDay) from OrderConfig collection
    const orderConfig = await OrderConfig.findOne();
    if (!orderConfig) {
      return res.status(500).json({
        message:
          "Order configuration not found. Please configure maxOrdersPerDay first.",
      });
    }

    // If maxOrdersPerDay is set to 0, there is no limit on orders for the day
    if (orderConfig.maxOrdersPerDay !== 0) {
      const today = new Date().setHours(0, 0, 0, 0); // Start of today
      const ordersToday = await Order.countDocuments({
        createdAt: { $gte: today },
      });

      if (ordersToday >= orderConfig.maxOrdersPerDay) {
        return res.status(400).json({
          message:
            "Order limit for today has been reached. Please try again tomorrow.",
        });
      }
    }

    // Check availability of each item based on totalAvailableQtyPerDay
    const todayStart = new Date();
    todayStart.setHours(0, 0, 0, 0); // Start of today

    for (const item of items) {
      const itemDoc = await Item.findById(item._id); // Fetch item document from Item collection

      if (!itemDoc) {
        return res.status(404).json({ message: `Item ${item.name} not found` });
      }

      // If totalAvailableQtyPerDay is set to 0, it's unlimited
      if (itemDoc.totalAvailableQtyPerDay !== 0) {
        // Aggregate to find today's ordered quantity for this item
        const orderedQuantityToday = await Order.aggregate([
          {
            $match: {
              createdAt: { $gte: todayStart }, // Match orders created today
            },
          },
          { $unwind: "$items" }, // Unwind items array to access each item individually
          {
            $match: {
              "items._id": new mongoose.Types.ObjectId(item._id), // Correctly instantiate ObjectId
            },
          },
          {
            $group: {
              _id: "$items._id",
              totalOrdered: { $sum: "$items.quantity" }, // Sum the quantity ordered today
            },
          },
        ]);

        const totalOrderedToday = orderedQuantityToday.length
          ? orderedQuantityToday[0].totalOrdered
          : 0;

        // Check if adding this new order quantity exceeds the available quantity
        if (
          totalOrderedToday + item.quantity >
          itemDoc.totalAvailableQtyPerDay
        ) {
          return res.status(400).json({
            message: `Item ${itemDoc.name} has reached its maximum available quantity for today.`,
          });
        }
      }
    }

    // Validate collectionTime format (HH:mm)
    const { collectionTime } = req.body;

    if (
      !collectionTime ||
      !/^([01]\d|2[0-3]):([0-5]\d)$/.test(collectionTime)
    ) {
      return res
        .status(400)
        .json({ message: "Invalid collection time! Use HH:mm format." });
    }

    // Determine whether user is logged in or guest
    const customer = req.user ? req.user._id : null;

    const guestInfo = req.user
      ? null
      : {
          name: req.body.name,
          email: req.body.email,
          phone: req.body.phone,
        };

    // Create the order without deliveryInfo
    const order = new Order({
      customer,
      guestInfo,
      items: items.map((item) => ({
        _id: item._id,
        name: item.name,
        price: item.price,
        quantity: item.quantity,
        option: item.option,
        optionTwo: item.optionsTwo,
        sans: item.sans && item.sans.map((s) => ({ name: s.name })),
        sauce: item?.sauces && item?.sauces?.map((s) => ({ _id: s._id })),
        drinks: item?.drinks && item?.drinks?.map((s) => ({ _id: s._id })),
        naanSauce:
          item?.naanSauces && item?.naanSauces?.map((s) => ({ _id: s._id })),
      })),
      totalAmount,
      collectionTime,
    });
    console.log(order);

    // Save the order to the database
    const saveOrder = await order.save();

    // Send email to customer
    const transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false,
      auth: {
        user: process.env.EMAIL,
        pass: process.env.PASSWORD, // Use app-specific password
      },
    });

    const mailOptions = {
      to: guestInfo?.email || req?.user?.email, // Send email to the guest or logged-in user
      subject: "Order Confirmation",
      text: `Dear ${
        guestInfo?.name || req?.user?.firstName
      },\n\nYour order has been successfully placed. Here are the details:\n\nOrder ID: ${
        saveOrder._id
      }\nTotal Amount: ${totalAmount}\nCollection Time: ${collectionTime}\n\nThank you for your order!\n\nBest regards,\nNew Delhices Restaurant`,
    };

    transporter.sendMail(mailOptions, (err, info) => {
      if (err) {
        console.error("Error sending email:", err);
      } else {
        console.log("Email sent:", info.response);
      }
    });

    res.status(201).json({ message: "Order created successfully", saveOrder });
  } catch (error) {
    res.status(500).json({ message: "Error creating order", error });
  }
});

// GET /api/orders - Get all orders (admin only)
router.get("/", auth, admin, async (req, res) => {
  try {
    const orders = await Order.find()
      .sort({ createdAt: -1 })
      .populate("customer", "firstName lastName email")
      .populate({
        path: "items.drinks", // Correct path for drinks in items
        select: "title price _id", // Only fetch price and _id of the drinks
      })
      .populate({
        path: "items.sauce", // Populate sauces in the items array
        select: "title price _id", // Only fetch title, price, and _id of the sauces
      })

      .populate({
        path: "items.naanSauce", // Populate sauces in the items array
        select: "title image  _id", // Only fetch title, price, and _id of the sauces
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});
router.get("/:id", auth, admin, async (req, res) => {
  try {
    const orders = await Order.findById(req.params.id)
      .populate("customer", "firstName lastName email")
      .populate({
        path: "items.drinks", // Correct path for drinks in items
        select: "title price _id", // Only fetch price and _id of the drinks
      })
      .populate({
        path: "items.sauce", // Populate sauces in the items array
        select: "title price _id", // Only fetch title, price, and _id of the sauces
      })

      .populate({
        path: "items.naanSauce", // Populate sauces in the items array
        select: "title image  _id", // Only fetch title, price, and _id of the sauces
      });
    res.status(200).json(orders);
  } catch (error) {
    res.status(500).json({ message: "Error fetching orders", error });
  }
});

// DELETE /api/orders/:id - Delete an order by ID
router.delete("/:id", auth, admin, async (req, res) => {
  const orderId = req.params.id;

  try {
    const deletedOrder = await Order.findByIdAndDelete(orderId);
    if (!deletedOrder) {
      return res.status(404).json({ message: "Order not found" });
    }
    res
      .status(200)
      .json({ message: "Order deleted successfully", deletedOrder });
  } catch (error) {
    res.status(500).json({ message: "Error deleting order", error });
  }
});

// Update /api/orders/:id (admin only)
router.put("/:id", auth, admin, async (req, res) => {
  try {
    // Extract order ID from params and status from request body
    const orderId = req.params.id;
    const { status } = req.body;

    // Find the order by ID and update the status
    const order = await Order.findByIdAndUpdate(
      orderId,
      { status },
      { new: true } // Return the updated document
    );

    // Check if order exists
    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({ order, message: "Order Status Updated" });
  } catch (error) {
    res.status(500).json({ message: "Error updating order status", error });
  }
});

// Update max tables per day - PUT /api/config/max-tables
router.put("/max-orders", auth, admin, async (req, res) => {
  const { maxOrdersPerDay } = req.body;

  // Ensure maxTablesPerDay is a valid number
  if (typeof maxOrdersPerDay !== "number") {
    return res.status(400).json({
      message: "Invalid input: maxOrdersPerDay must be a number",
    });
  }

  try {
    let config = await OrderConfig.findOne();

    if (!config) {
      config = new OrderConfig({ maxOrdersPerDay });
    } else {
      config.maxOrdersPerDay = maxOrdersPerDay;
    }

    const savedConfig = await config.save();
    res.status(200).json({
      message: "Configuration updated successfully",
      maxOrdersPerDay: savedConfig.maxOrdersPerDay,
    });
  } catch (error) {
    res.status(500).json({
      message: "Error updating configuration",
      error: error.message,
    });
  }
});

module.exports = router;
