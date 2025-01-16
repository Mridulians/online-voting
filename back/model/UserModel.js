import mongoose from "mongoose";

// Define the schema for user data
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure the email is unique
    lowercase: true,
    trim: true,
    match: [/\S+@\S+\.\S+/, "Please use a valid email address"], // Basic email validation
  },
  otp: {
    type: String,
  },
  otpExpires: {
    type: Date, // This can be used to expire the OTP after a set period
  },
});

// Create a model based on the schema
export const User = mongoose.model("User_Otp", userSchema);
