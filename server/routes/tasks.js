const express = require("express");
const router = express.Router();
const {
  createTask,
  allTasks,
  deleteTask,
  updateTask,
} = require("../controller/tasks");

router.post("/newTask", createTask);
router.get("/allTasks", allTasks);
router.delete("/deleteTask/:id", deleteTask);
router.put("/updateTask/:id", updateTask);

module.exports = router;
