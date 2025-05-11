const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  dueDate: Date,
  assignee: String,
  section: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Section",
    required: true,
  },
});

module.exports = mongoose.model("Task", taskSchema);
