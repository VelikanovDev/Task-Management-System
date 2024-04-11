const Task = require("../models/user"); // Adjust the path to your models as necessary

const users = [
  // password: password
  {
    username: "Alice",
    password: "$2a$12$TFztTSlXoGCONfpcRW752.8j.lWX932qrhmZwvVRKmSKZ.5iLGo6W",
  },
  {
    username: "Bob",
    password: "$2a$12$TFztTSlXoGCONfpcRW752.8j.lWX932qrhmZwvVRKmSKZ.5iLGo6W",
  },
  {
    username: "Charlie",
    password: "$2a$12$TFztTSlXoGCONfpcRW752.8j.lWX932qrhmZwvVRKmSKZ.5iLGo6W",
  },
  {
    username: "Dana",
    password: "$2a$12$TFztTSlXoGCONfpcRW752.8j.lWX932qrhmZwvVRKmSKZ.5iLGo6W",
  },
  {
    username: "Evan",
    password: "$2a$12$TFztTSlXoGCONfpcRW752.8j.lWX932qrhmZwvVRKmSKZ.5iLGo6W",
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
