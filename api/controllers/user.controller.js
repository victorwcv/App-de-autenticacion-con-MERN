import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";

// Test endpoint
export const test = (req, res) => {
  res.json({
    message: "Hello World!",
  });
};

// Update user information
export const updateUser = async (req, res, next) => {
  // Check if the user is authorized to update the account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can update only your account!"));
  }
  try {
    if (req.body.password) {
      req.body.password = bcryptjs.hashSync(req.body.password, 10);
    }
    // Find and update the user information in the database
    const updatedUser = await User.findByIdAndUpdate(
      req.params.id,
      {
        $set: {
          username: req.body.username,
          email: req.body.email,
          password: req.body.password,
          profilePicture: req.body.profilePicture,
        },
      },
      // it returns the new value instead of the old one
      { new: true }
    );
    // Remove the password field from the updated user data before sending the response
    const { password, ...rest } = updatedUser._doc;
    res.status(200).json(rest);
  } catch (error) {
     // Pass any errors to the error handler middleware
    next(error);
  }
};

// Delete user account
export const deleteUser = async (req, res, next) => {
  // Check if the user is authorized to delete the account
  if (req.user.id !== req.params.id) {
    return next(errorHandler(401, "You can delete only your account"));
  }
  try {
    // Find and delete the user from the database
    await User.findByIdAndDelete(req.params.id);
    // Send success message in the response
    res.status(200).json("User has been deleted");
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
};
