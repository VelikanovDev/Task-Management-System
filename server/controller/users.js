const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.register = async (req, res, next) => {
  const { username, password } = req.validatedUser;

  try {
    // Check if a user with the same username already exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      return res.status(409).json({ message: "Username already in use." });
    }
    // If the user does not exist, hash the password and create a new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = new User({ username, password: hashedPassword });
    await user.save();

    res.status(201).json({
      success: true,
      user: { id: user._id, username: user.username },
    });
    next();
  } catch (error) {
    next(error);
  }
};

module.exports.login = async (req, res) => {
  const { _id, username } = req.user;
  req.session.userId = _id;
  req.session.username = username;
  res.status(200).json({
    message: "Login successful",
    user: { id: _id, username: username },
  });
};

module.exports.logout = async (req, res, next) => {
  req.session.userId = null;
  req.session.save((err) => {
    if (err) next(err);
    req.session.regenerate((err) => {
      if (err) next(err);
      res.status(200).json({ message: "Logout successful" });
    });
  });
};

module.exports.checkSession = async (req, res) => {
  if (req.session.userId) {
    res.status(200).json({
      isLoggedIn: true,
      user: {
        id: req.session.userId,
        username: req.session.username,
      },
    });
  } else {
    res.status(200).json({
      isLoggedIn: false,
      user: null, // No user information available
    });
  }
};

module.exports.allUsers = async (req, res, next) => {
  const users = await User.find({});
  res.status(200).json(users);
  next();
};
