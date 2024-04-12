const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  const { username, password } = req.validatedUser;

  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    console.log("Here");
    if (existingUser) {
      return res.status(409).json({ message: "Username already in use." });
    }
    // If the user does not exist, hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({
      message: "User created successfully.",
      user: { id: user._id, username: user.username },
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res) => {
  const { _id } = req.user;
  req.session.userId = _id;
  res.status(200).json("Login successful");
};

module.exports.logout = async (req, res, next) => {
  console.log("deleting session cookie");
  req.session.userId = null;
  req.session.save((err) => {
    if (err) next(err);
    req.session.regenerate((err) => {
      if (err) next(err);
      res.status(200).json({ message: "Logout successful" });
    });
  });
};
