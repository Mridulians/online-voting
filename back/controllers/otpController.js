import { User } from "../model/UserModel.js";
import nodemailer from "nodemailer";
import crypto from "crypto";
import dotenv from "dotenv";

dotenv.config();

// Create a transporter for email (Replace with your SMTP credentials)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_ID, // Replace with your email
    pass: process.env.GMAIL_PASS, // Replace with your email password
  },
});

// Function to send OTP email
const sendOtpEmail = async (email, otp) => {
  const mailOptions = {
    from: "cryptoventure593@gmail.com",
    to: email,
    subject: "Your OTP Code",
    text: `Your OTP code is ${otp}`,
  };

  await transporter.sendMail(mailOptions);
};

// Generate a random OTP
const generateOtp = () => {
  const otp = Math.floor(100000 + Math.random() * 900000).toString();
  return otp;
};

// In-memory store for OTPs (to avoid saving them in the database)
const otpStore = new Map();

// Controller to send OTP to email
export const sendOtp = async (req, res) => {
  const { name, email } = req.body;

  try {
    // Check if the user already exists by email
    const user = await User.findOne({ email });
    if (user) {
      return res
        .status(400)
        .json({ error: "User with this email already exists." });
    }

    // Generate OTP and store it in memory with an expiration time
    const otp = generateOtp();
    const otpExpires = new Date();
    otpExpires.setMinutes(otpExpires.getMinutes() + 10); // OTP expires after 10 minutes

    otpStore.set(email, { otp, otpExpires, name }); // Temporarily store the OTP and name

    // Send OTP email
    await sendOtpEmail(email, otp);

    res.status(200).json({ message: "OTP sent successfully to your email!" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to send OTP. Please try again." });
  }
};

// Controller to verify OTP
export const verifyOtp = async (req, res) => {
  const { email, otp } = req.body;

  try {
    // Retrieve OTP details from the in-memory store
    const otpDetails = otpStore.get(email);

    if (!otpDetails) {
      return res
        .status(400)
        .json({ error: "No OTP request found for this email." });
    }

    const { otp: storedOtp, otpExpires, name } = otpDetails;

    // Check if OTP matches and has not expired
    if (otp === storedOtp && new Date() <= otpExpires) {
      // Save user to the database after successful OTP verification
      const newUser = new User({ name, email });
      await newUser.save();

      // Remove the OTP from the in-memory store
      otpStore.delete(email);

      res
        .status(200)
        .json({ message: "OTP verified successfully! User registered." });
    } else {
      res
        .status(400)
        .json({ error: "Invalid or expired OTP. Please try again." });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to verify OTP. Please try again." });
  }
};



// Controller to get all users
export const getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Retrieve all users from the database
    res.status(200).json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Failed to fetch users. Please try again." });
  }
};
