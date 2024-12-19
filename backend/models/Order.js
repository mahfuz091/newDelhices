const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  customer: {
    type: mongoose.Schema.Types.ObjectId, // Reference to the User model
    ref: "User",
    required: false, // Optional to support guest orders
  },
  guestInfo: {
    // Info for non-logged-in users
    name: { type: String, required: false }, // Guest name
    email: { type: String, required: false }, // Guest email
    phone: { type: String, required: false }, // Guest phone
  },
  items: [
    {
      _id: mongoose.Schema.Types.ObjectId,
      name: String,
      price: Number,
      quantity: Number,
      option: {
        // Step 1 Option
        _id: mongoose.Schema.Types.ObjectId, // ID of the selected step1Option
        title: String, // Title of the step1Option
        price: String, // Additional price for this option
      },
      optionTwo: {
        // Step 2 Option
        _id: mongoose.Schema.Types.ObjectId, // ID of the selected step2Option
        title: String, // Title of the step2Option
        price: String, // Additional price for this option
      },
      drinks: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "DrinkNFries",
        },
      ],
      sauce: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Sauce",
        },
      ],
      naanSauce: [
        {
          type: mongoose.Schema.Types.ObjectId,
          ref: "NanSauce",
        },
      ],
      sans: [
        {
          name: String,
        },
      ],
    },
  ],
  totalAmount: {
    type: Number,
    required: true,
  },

  collectionTime: {
    type: String,
    required: true, // Collection time is required for all orders
  },
  status: {
    type: String,
    default: "Pending",
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

const Order = mongoose.model("Order", OrderSchema);
module.exports = Order;
