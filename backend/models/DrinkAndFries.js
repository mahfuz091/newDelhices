const mongoose = require("mongoose");

const drinkNFriesSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
    price: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const DrinkAndFries = mongoose.model("DrinkNFries", drinkNFriesSchema);
module.exports = DrinkAndFries;
