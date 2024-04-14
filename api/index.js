import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import userRoutes from "./routes/user.route.js";
import authRoutes from "./routes/auth.route.js";
import cookieParser from "cookie-parser";

// Load environment variables from .env file
dotenv.config();
const app = express();

// Middleware to parse JSON bodies
app.use(express.json());
// Middleware to parse cookies
app.use(cookieParser());

// Connect to MongoDB
mongoose
  .connect(process.env.MONGO)
  .then(() => {
    console.log("MongoDB Connected");
  })
  .catch((err) => {
    console.error(err);
  });

  // Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

// Routes for user and authentication
app.use("/api/user", userRoutes);
app.use("/api/auth", authRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  // Set status code and message based on error or default values
  const statusCode = err.statusCode || 500;
  const message = err.message || "Internal Server Error";
   // Send JSON response with error details
  return res.status(statusCode).json({
    success: false,
    message,
    statusCode,
  });
});
