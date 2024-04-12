const Task = require("../models/user"); // Adjust the path to your models as necessary

const users = [
  // password: password (10 rounds)
  {
    username: "Alice",
    password: "$2a$10$pu/5pol4J.51D9AAyUg9c.hfnVVdnuSRpYACT8DPXp3/.TD6Kv5QO",
  },
  {
    username: "Bob",
    password: "$2a$10$pu/5pol4J.51D9AAyUg9c.hfnVVdnuSRpYACT8DPXp3/.TD6Kv5QO",
  },
  {
    username: "Charlie",
    password: "$2a$10$pu/5pol4J.51D9AAyUg9c.hfnVVdnuSRpYACT8DPXp3/.TD6Kv5QO",
  },
  {
    username: "Dana",
    password: "$2a$10$pu/5pol4J.51D9AAyUg9c.hfnVVdnuSRpYACT8DPXp3/.TD6Kv5QO",
  },
  {
    username: "Evan",
    password: "$2a$10$pu/5pol4J.51D9AAyUg9c.hfnVVdnuSRpYACT8DPXp3/.TD6Kv5QO",
  },
];

async function seedUsersDB() {
  try {
    await Task.insertMany(users);
    console.log("Users seeded successfully!");
  } catch (error) {
    console.error("Error seeding the database:", error);
  }
}

module.exports = seedUsersDB;
