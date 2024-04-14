import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";
import jwt from "jsonwebtoken";

// Function to handle user signup
export const signup = async (req, res, next) => {
  const { username, email, password } = req.body;
  // Hash the password before saving it to the database
  const hashedPassword = bcryptjs.hashSync(password, 10);
  // Create a new user instance with hashed password
  const newUser = new User({ username, email, password: hashedPassword });
  try {
    // Save the new user to the database
    await newUser.save();
    // Respond with a success message
    res.status(201).json({
      message: "User created succesfully",
    });
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
};

// Function to handle user signin
export const signin = async (req, res, next) => {
  const { email, password } = req.body;
  try {
    // Find the user by email in the database
    const validUser = await User.findOne({ email });
    // If user not found, return an error
    if (!validUser) return next(errorHandler(404, "User not found"));
    // Compare the provided password with the stored hashed password
    const validPassword = bcryptjs.compareSync(password, validUser.password);
    // If passwords don't match, return an error
    if (!validPassword) return next(errorHandler(401, "Wrong credentials"));
    // Create a JWT token for the user
    const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET);
    // Remove the password field from the user object before sending it in the response
    const { password: hashedPassword, ...rest } = validUser._doc;
    // Set the JWT token as a cookie and send user data in the response
    res
      .cookie("access_token", token, { httpOnly: true, maxAge: 3600000 })
      .status(200)
      .json(rest);
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
  }
};


// Function to handle Google OAuth signin
export const google = async (req, res, next) => {
  try {
    // Check if user already exists in the database
    const user = await User.findOne({ email: req.body.email });
    // If user exists, create a JWT token and set it as a cookie
    if (user) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      const { password: hashedPassword, ...rest } = user._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    } else {
      // If user does not exist, generate a random password and create a new user
      const generatedPassword =
        Math.random().toString(36).slice(-8) +
        Math.random().toString(36).slice(-8);
      const hashedPassword = bcryptjs.hashSync(generatedPassword, 10);
      const newUser = new User({
        username:
          req.body.name.split(" ").join("").toLowerCase() +
          Math.floor(Math.random() * 99999).toString(),
        email: req.body.email,
        password: hashedPassword,
        profilePicture: req.body.photo,
      });
      await newUser.save();
      // Create a JWT token for the new user and set it as a cookie
      const token = jwt.sign({ id: newUser._id }, process.env.JWT_SECRET);
      const { password: hashedPassword2, ...rest } = newUser._doc;
      const expiryDate = new Date(Date.now() + 3600000);
      res
        .cookie("access_token", token, { httpOnly: true, expires: expiryDate })
        .status(200)
        .json(rest);
    }
  } catch (error) {
    // Pass any errors to the error handler middleware
    next(error);
    console.log(error);
  }
};
// Function to handle user signout
export const signout = (req, res) => {
  // Clear the access token cookie and send signout success message
  res.clearCookie("access_token").status(200).json("Signout success");
};
