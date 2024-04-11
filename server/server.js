const mongoose = require("mongoose").default;
const cors = require("cors");
const express = require("express");
const TaskSchema = require("./models/task");
const UserSchema = require("./models/user");
const seedTasksDB = require("./seeds/seed-tasks");
const seedUsersDB = require("./seeds/seed-users");

const app = express();
const PORT = 3001;

app.use(express.json());
app.use(cors());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
    checkAndSeedDatabase(); // Function to check data and seed if necessary
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Function to check data and seed if necessary
async function checkAndSeedDatabase() {
  // const Task = mongoose.model("Task", TaskSchema); // Ensure Task is the correct model

  const countTask = await TaskSchema.countDocuments();
  const countUsers = await UserSchema.countDocuments();

  if (countTask === 0) {
    console.log("No tasks found, seeding database...");
    await seedTasksDB();
  }

  if (countUsers === 0) {
    console.log("No users found, seeding database...");
    await seedUsersDB();
  }
}

// Routes
app.get("/tasks", async (req, res) => {
  try {
    const tasks = await TaskSchema.find();
    res.json(tasks);
  } catch (error) {
    res.status(500).send(error);
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
