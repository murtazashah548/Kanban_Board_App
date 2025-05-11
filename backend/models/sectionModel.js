const mongoose = require("mongoose");

const sectionSchema = new mongoose.Schema({
  title: { type: String, required: true },
});

module.exports = mongoose.model("Section", sectionSchema);
