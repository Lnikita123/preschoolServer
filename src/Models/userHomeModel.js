const mongoose = require("mongoose");

const userHomeSchema = new mongoose.Schema(
  {
    id: {
      type: Number,
    },
    Name: {
      type: String,
    },

    Age: {
      type: String,
    },
    parentName: {
      type: String,
    },
    Mobile: {
      type: String,
    },
    Email: {
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
module.exports = mongoose.model("Userhome", userHomeSchema);
