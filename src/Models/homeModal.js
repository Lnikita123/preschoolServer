const mongoose = require("mongoose");

const homeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Photos: {
      type: String,
    },
    Heading: {
      type: String,
    },
    Description: {
      type: String,
    },
    Link: {
      type: String,
    },
    Published: {
      type: Boolean,
      default: false,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);
module.exports = mongoose.model("Home", homeSchema);
