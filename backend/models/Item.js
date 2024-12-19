const mongoose = require("mongoose");

const itemSchema = new mongoose.Schema(
  {
    image: {
      type: String,
    },
    name: {
      type: String,
      required: true,
    },
    details: {
      type: String,
    },
    price: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Category",
      required: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    availability: {
      type: Boolean,
      default: true, // Default availability to true (available)
    },
    totalAvailableQtyPerDay: {
      type: Number,
      default: 0, // Default to 0, representing unlimited availability per day
    },
    // New fields for Step 1 options
    step1Options: [
      {
        title: { type: String },
        image: { type: String }, // Store image URL or file path
        price: { type: String },
      },
    ],
    // New fields for Step 2 options
    step2Options: [
      {
        title: { type: String },
        image: { type: String }, // Store image URL or file path
        price: { type: String },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Item = mongoose.model("Item", itemSchema);
module.exports = Item;
