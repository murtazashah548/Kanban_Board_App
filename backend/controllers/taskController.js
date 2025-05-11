const Task = require("../models/taskModel");

exports.createTask = async (req, res) => {
  try {
    const { name, description, dueDate, assignee, section } = req.body;

    if (!name || !section) {
      return res.status(400).json({
        message: "Task name and section are required",
      });
    }

    const task = await Task.create({ name, description, dueDate, assignee, section });

    res.status(201).json({
      message: "Task created successfully",
      data: task,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const tasks = await Task.find().populate("section");
    res.status(200).json({
      message: "Tasks fetched successfully",
      data: tasks,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });

    if (!updatedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({
      message: "Task updated successfully",
      data: updatedTask,
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const deletedTask = await Task.findByIdAndDelete(req.params.id);

    if (!deletedTask) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
















// const Task = require("../models/taskModel");

// exports.createTask = async (req, res) => {
//   try {
//     const task = await Task.create(req.body);
//     res.status(201).json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.getTasks = async (req, res) => {
//   try {
//     const tasks = await Task.find().populate("section");
//     res.json(tasks);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.updateTask = async (req, res) => {
//   try {
//     const task = await Task.findByIdAndUpdate(req.params.id, req.body, { new: true });
//     res.json(task);
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };

// exports.deleteTask = async (req, res) => {
//   try {
//     await Task.findByIdAndDelete(req.params.id);
//     res.json({ message: "Task deleted" });
//   } catch (err) {
//     res.status(500).json({ error: err.message });
//   }
// };
