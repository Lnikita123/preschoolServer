const mongoose = require("mongoose");
const contacpageschema = new mongoose.Schema(
  {
    id: {
      type: Number,
      unique: false,
    },
    Address: {
      type: String,
    },
    Photo: {
      type: String,
    },
    Email: {
      type: String,
    },
    Phone: {
      type: String,
    },
    Published: {
      type: Boolean,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contacpage", contacpageschema);
