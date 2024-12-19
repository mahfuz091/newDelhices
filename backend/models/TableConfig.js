const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  maxTablesPerDay: {
    type: Number,
    required: true,
    default: 10,
  },
});

const TableConfig = mongoose.model("TableConfig", configSchema);

module.exports = TableConfig;
