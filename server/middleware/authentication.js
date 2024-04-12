const User = require("../models/user");
const bcrypt = require("bcrypt");

module.exports.isLoggedIn = (req, res, next) => {
  if (!req.session.userId) {
    res.status(401).json({ message: "User not logged in" });
  } else {
    console.log("User is logged in");
    next();
  }
};

module.exports.areCredentialsVerified = async (req, res, next) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });
  if (!user) {
    return res.status(401).json("User not found");
  }
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    return res.status(401).json("Invalid credentials");
  }
  req.user = user;
  next();
};
