const mongoose = require("mongoose");

const AddprogramSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Heading: {
      type: String,
    },

    Description: {
      type: String,
    },
    Photos: {
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
module.exports = mongoose.model("Addprogram", AddprogramSchema);
