const mongoose = require("mongoose");

const configSchema = new mongoose.Schema({
  maxOrdersPerDay: {
    type: Number,
    required: true,
    default: 0,
  },
});

const OrderConfig = mongoose.model("OrderConfig", configSchema);

module.exports = OrderConfig;
