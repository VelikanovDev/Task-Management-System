const User = require("../models/user");
const bcrypt = require("bcrypt");

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
