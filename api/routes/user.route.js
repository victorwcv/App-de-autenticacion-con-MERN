import express from "express";
import {
  test,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import { verifyToken } from "../utils/verifyUser.js";

const router = express.Router();
// Test endpoint
router.get("/", test);

// Routes for updating and deleting user accounts
router.post("/update/:id", verifyToken, updateUser); // Route for updating user information
router.delete("/delete/:id", verifyToken, deleteUser); // Route for deleting user account

export default router;
