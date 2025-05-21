const express = require("express");
const {
  signUpUsers,
} = require("../controller/authController/signUpController");
const { signInUser } = require("../controller/authController/signInUsers");
const { authMiddleware } = require("../middleware/authMiddleware");
const authRouter = express.Router();


authRouter.route("/signUpUser").post(signUpUsers);

authRouter.route("/signInUser").post(signInUser);

module.exports = authRouter;
