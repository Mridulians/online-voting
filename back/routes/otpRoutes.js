import express from "express";
import { getAllUsers, sendOtp, verifyOtp } from "../controllers/otpController.js";

const router = express.Router();

// Route to register a new user
// router.post("/register", registerUser);

// Route to send OTP
router.post("/send-otp", sendOtp);

// Route to verify OTP
router.post("/verify-otp", verifyOtp);

// Route to get all users
router.get("/users", getAllUsers);

export default router;
