const { validateUser } = require("../middleware/user-validation");
const express = require("express");
const { register, login, logout } = require("../controller/users");
const router = express.Router();
const catchAsync = require("../utils/catchAsync");
const { areCredentialsVerified } = require("../middleware/authentication");
const { checkSession } = require("../controller/tasks");

router.route("/register").post(validateUser, catchAsync(register));

router
  .route("/login")
  .post(catchAsync(areCredentialsVerified), catchAsync(login));

router.route("/logout").get(catchAsync(logout));
router.get("/check-session", checkSession);

module.exports = router;
