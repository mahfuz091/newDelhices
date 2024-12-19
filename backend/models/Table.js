const mongoose = require("mongoose");

const tableSchema = new mongoose.Schema(
  {
    date: {
      type: String,
      require: true,
    },
    hour: {
      type: String,
      require: true,
    },
    peopleCount: {
      type: String,
      require: true,
    },
    email: {
      type: String,
      require: true,
    },
    fname: {
      type: String,
      require: true,
    },
    lname: {
      type: String,
      require: true,
    },
    phone: {
      type: String,
      require: true,
    },
    address: {
      type: String,
      require: true,
    },
    comment: {
      type: String,
      require: true,
    },
  },
  {
    timestamps: true,
  }
);

const Table = mongoose.model("Table", tableSchema);
module.exports = Table;
