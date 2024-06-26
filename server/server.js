const mongoose = require("mongoose").default;
const cors = require("cors");
const express = require("express");
const session = require("express-session");
const TaskSchema = require("./models/task");
const UserSchema = require("./models/user");
const seedTasksDB = require("./seeds/seed-tasks");
const seedUsersDB = require("./seeds/seed-users");
const taskRouter = require("./routes/tasks");
const userRouter = require("./routes/users");

const app = express();
const PORT = 3001;
const secret = "this is my biggest secret";
const sessionConfiguration = {
  secret,
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
    maxAge: 1000 * 60 * 60 * 24 * 7,
  },
};

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
    credentials: true, // this allows the server to accept the client's cookies
  }),
);
app.use(session(sessionConfiguration));

app.use((req, res, next) => {
  res.locals.currentUser = req.session.userId;
  next();
});

app.use("/api", taskRouter); // Mount the router on the `/api` path
app.use("/", userRouter); // Mount the router on the `/` path

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/tasks", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("DB connected");
    checkAndSeedDatabase().then(); // Function to check data and seed if necessary
  })
  .catch((err) => console.log("Error connecting to MongoDB:", err));

// Function to check data and seed if necessary
async function checkAndSeedDatabase() {
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

// Start the server
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
