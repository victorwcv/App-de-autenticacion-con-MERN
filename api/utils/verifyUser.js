import jwt from "jsonwebtoken";
import { errorHandler } from "./error.js";

// Middleware to verify JWT token
export const verifyToken = (req, res, next) => {
  // Extract token from cookies
  const token = req.cookies.access_token;

  // Check if token exists
  if (!token) {
    // If token doesn't exist, return error
    return next(errorHandler(401, "You are not authenticated!"));
  }

  // Verify the token
  jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
    // If verification fails, return error
    if (err) {
      return next(errorHandler(403, "Token is not valid!"));
    }
    // If verification succeeds, attach user object to request and proceed
    req.user = user;
    next();
  });
};
