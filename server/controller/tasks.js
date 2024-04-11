const Task = require("../models/task");
const ExpressError = require("../utils/ExpressError");

module.exports.createTask = async (req, res, next) => {
  try {
    const task = new Task(req.body);
    const savedTask = await task.save();
    res.status(201).json(savedTask);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
  next();
};

module.exports.allTasks = async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
};

module.exports.deleteTask = async (req, res) => {
  const { id } = req.params;
  const deletedComment = await Task.findByIdAndDelete(id);
  if (!deletedComment) {
    throw new ExpressError("Document not found", 404);
  }
  res.status(204).json([]);
};
