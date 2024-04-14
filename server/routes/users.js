const { validateUser } = require("../middleware/user-validation");
const express = require("express");
const { register, login, logout, allUsers } = require("../controller/users");
const router = express.Router();
const { areCredentialsVerified } = require("../middleware/authentication");
const { checkSession } = require("../controller/users");

router.route("/register").post(validateUser, register);

router.route("/login").post(areCredentialsVerified, login);

router.route("/logout").get(logout);
router.get("/check-session", checkSession);

router.get("/allUsers", allUsers);

module.exports = router;
