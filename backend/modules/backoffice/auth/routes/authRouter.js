const express = require("express");
const router = express.Router();
const authController = require("../controller/authController");

router.get("/", authController.index);
router.post("/sign-up", authController.signUp);
router.post("/login", authController.login);
router.post("/sign-up-confirm", authController.signUpConfirm);
router.post("/forgot-password", authController.forgotPassword);
router.post("/reset-password", authController.resetPassword);
router.post("/verify-token", authController.verifyToken);
router.post("/verify-otp", authController.verifyOTP);

module.exports = router;
