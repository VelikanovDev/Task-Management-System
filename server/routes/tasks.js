const express = require("express");
const router = express.Router();
const { createTask, allTasks, deleteTask } = require("../controller/tasks");

router.post("/newTask", createTask);
router.get("/allTasks", allTasks);
router.delete("/deleteTask/:id", deleteTask);

module.exports = router;
