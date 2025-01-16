import express from "express";
import bodyParser from "body-parser";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import otpRoutes from "./routes/otpRoutes.js";
import voteRoutes from "./routes/voteRoutes.js"; // Import the routes


dotenv.config();

const app = express();

// Middleware
app.use(bodyParser.json());
app.use(cors());

// Database connection
connectDB();

// OTP Routes
app.use("/api", otpRoutes);

// Votes Routes
app.use("/api", voteRoutes);
 
app.get("/", (req, res) => {
    res.send("Server is running.");
})


const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
