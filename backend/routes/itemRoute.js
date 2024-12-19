const express = require("express");
const Item = require("../models/Item");
const { auth, admin } = require("../middleware/auth");
const multer = require("multer");
const path = require("path");
const cron = require("node-cron");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//     cb(null, "public/images");
//   },
//   filename: (req, image, cb) => {
//     cb(
//       null,
//       image.filename + "_" + Date.now() + path.extname(image.originalname)
//     );
//   },
// });

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "../src/assets/images");
  },
  filename: (req, file, cb) => {
    cb(
      null,
      path.parse(file.originalname).name +
        "_" +
        Date.now() +
        path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
});

const router = express.Router();

// Cron job to reset totalAvailableQtyPerDay at midnight
cron.schedule("0 0 * * *", async () => {
  try {
    // Reset the `totalAvailableQtyPerDay` field to 0 for all items
    await Item.updateMany({}, { $set: { totalAvailableQtyPerDay: 0 } });

    console.log("Successfully reset totalAvailableQtyPerDay for all items.");
  } catch (error) {
    console.error("Error resetting totalAvailableQtyPerDay:", error.message);
  }
});

// Define the route to handle the request
router.post(
  "/",
  auth,
  admin,
  upload.fields([
    { name: "image", maxCount: 1 }, // Main item image
    { name: "step1OptionsImages[]", maxCount: 5 }, // Accept array of step 1 images
    { name: "step2OptionsImages[]", maxCount: 5 }, // Accept array of step 2 images
  ]),
  async (req, res) => {
    try {
      // Handle main item image
      const imagePath = req.files["image"]
        ? path.basename(req.files["image"][0].path)
        : "";
      console.log(req.files);

      // Handle step1Options images (array of files)
      const step1OptionImages = req.files["step1OptionsImages[]"] || [];
      const step1OptionsWithImages = step1OptionImages.map((file) => {
        return { image: path.basename(file.path) }; // Store image paths for step 1 options
      });

      // Handle step2Options images (array of files)
      const step2OptionImages = req.files["step2OptionsImages[]"] || [];
      const step2OptionsWithImages = step2OptionImages.map((file) => {
        return { image: path.basename(file.path) }; // Store image paths for step 2 options
      });

      // Parse the step options from request body
      const step1Options = req.body.step1Options
        ? JSON.parse(req.body.step1Options)
        : [];
      const step2Options = req.body.step2Options
        ? JSON.parse(req.body.step2Options)
        : [];

      // Combine the options with the images
      const combinedStep1Options = step1Options.map((option, index) => {
        return {
          ...option,
          image: step1OptionsWithImages[index]?.image || "", // Attach image to step1 options
        };
      });

      const combinedStep2Options = step2Options.map((option, index) => {
        return {
          ...option,
          image: step2OptionsWithImages[index]?.image || "", // Attach image to step2 options
        };
      });

      // Create a new item document
      const newItem = new Item({
        image: imagePath, // Main image path
        name: req.body.name,
        details: req.body.details,
        price: req.body.price,
        category: req.body.catId,
        availability:
          req.body.availability !== undefined ? req.body.availability : true,
        totalAvailableQtyPerDay: req.body.totalAvailableQtyPerDay || 0,
        createdBy: req.user._id,
        step1Options: combinedStep1Options, // Step 1 options with images
        step2Options: combinedStep2Options, // Step 2 options with images
      });
      console.log("Save", newItem, req.body.step1Options);

      const savedItem = await newItem.save();
      res.status(200).json(savedItem); // Successfully created item
    } catch (error) {
      console.error("Error saving item:", error);
      res.status(400).json({ error: error.message || "Failed to create item" });
    }
  }
);

// GET all items with optional search parameters
router.get("/", async (req, res) => {
  try {
    const { name, price, details } = req.query;

    const filter = {};

    if (name) filter.name = { $regex: name, $options: "i" }; // Case-insensitive search
    if (price) filter.price = price;
    if (details) filter.details = { $regex: details, $options: "i" };

    const items = await Item.find(filter);

    res.status(200).json(items);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// GET all items by Category
router.get("/category/:catId", async (req, res) => {
  try {
    const items = await Item.find({ category: req.params.catId });
    res.status(200).json(items);
  } catch (error) {
    res.status(400).json(error);
  }
});

// GET single Item
router.get("/:id", async (req, res) => {
  try {
    const item = await Item.findById(req.params.id);
    res.status(200).json(item);
  } catch (error) {
    res.status(400).json(error);
  }
});

// DELETE item by ID
router.delete("/:id", auth, admin, async (req, res) => {
  try {
    const deletedItem = await Item.findByIdAndDelete(req.params.id);

    if (!deletedItem) {
      return res.status(404).json({ message: "Item not found" });
    }

    res.status(200).json({ message: "Item deleted successfully", deletedItem });
  } catch (error) {
    res.status(400).json(error);
  }
});

// UPDATE item by ID (with file upload)
router.put("/:id", auth, admin, upload.single("image"), async (req, res) => {
  console.log(req.body);

  try {
    // Find the category by ID
    const item = await Item.findById(req.params.id);

    if (!item) {
      return res.status(404).json({ message: "Item not found" });
    }

    // If an image is uploaded, update the image path
    let imagePath = item.image; // Use the old image if no new image is uploaded
    if (req.file) {
      imagePath = path.basename(req.file.path); // Update to new image path
    }

    // Update item details
    item.name = req.body.name || item.name; // Only update if a new name is provided
    item.image = imagePath; // Update image path if a new image is uploaded
    item.price = req.body.price || item.price;
    item.details = req.body.details || item.details;
    item.availability =
      req.body.availability !== undefined
        ? req.body.availability
        : item.availability;
    item.totalAvailableQtyPerDay =
      req.body.totalAvailableQtyPerDay !== undefined
        ? req.body.totalAvailableQtyPerDay
        : item.totalAvailableQtyPerDay;
    item.updatedBy = req.user._id;

    // Save updated item
    const updatedItem = await item.save();

    // Respond with the updated item
    res.status(200).json(updatedItem);
  } catch (error) {
    console.error("Error updating item:", error);
    res.status(400).json({ message: "Error updating item" });
  }
});

module.exports = router;
