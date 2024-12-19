const mongoose = require("mongoose");

const nansauceSchema = new mongoose.Schema(
  {
    image: {
      type: String,
      required: true,
    },
    title: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const NanSauce = mongoose.model("NanSauce", nansauceSchema);
module.exports = NanSauce;
