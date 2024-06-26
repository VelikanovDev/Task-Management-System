const Task = require("../models/task");

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
    res.status(404).json("Task not found");
  }
  res.status(204).json([]);
};

module.exports.updateTask = async (req, res) => {
  const { id } = req.params;
  const { _id, ...task } = req.body;
  const updatedTask = await Task.findByIdAndUpdate(id, task);
  if (!updatedTask) {
    res.status(404).json("Task not found");
  }
  res.status(200).json(updatedTask);
};
