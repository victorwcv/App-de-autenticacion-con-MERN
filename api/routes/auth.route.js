import express from "express";
import {
  signin,
  signup,
  google,
  signout,
} from "../controllers/auth.controller.js";

const router = express.Router();

// Define routes for user authentication
router.post("/signup", signup); // Route for user signup
router.post("/signin", signin); // Route for user signin
router.post("/google", google); // Route for Google OAuth signin
router.get("/signout", signout); // Route for user signout

export default router;
