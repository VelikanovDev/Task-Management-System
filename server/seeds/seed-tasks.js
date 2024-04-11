const Task = require("../models/task");

const tasks = [
  {
    isDone: true,
    description: "Implement UI",
    assignedTo: "Alice",
    assignedBy: "Bob",
    priority: "High",
    due: "2024-04-12",
  },
  {
    isDone: false,
    description: "Fix backend bugs",
    assignedTo: "Bob",
    assignedBy: "Alice",
    priority: "Medium",
    due: "2024-04-15",
  },
  {
    isDone: false,
    description: "Write documentation",
    assignedTo: "Charlie",
    assignedBy: "Alice",
    priority: "Low",
    due: "2024-04-20",
  },
  {
    isDone: false,
    description: "Refactor service layer",
    assignedTo: "Dana",
    assignedBy: "Alice",
    priority: "Medium",
    due: "2024-04-25",
  },
  {
    isDone: true,
    description: "Update API endpoints",
    assignedTo: "Evan",
    assignedBy: "Alice",
    priority: "High",
    due: "2024-04-18",
  },
];

async function seedTasksDB() {
  try {
    await Task.insertMany(tasks);
    console.log("Database seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

module.exports = seedTasksDB;
