const mongoose = require("mongoose");

const teacherSchema = new mongoose.Schema(
  {
    id: {
      type: String,
    },
    Name: {
      type: String,
    },

    Education: {
      type: String,
    },
    Photo: {
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
module.exports = mongoose.model("Teacher", teacherSchema);
