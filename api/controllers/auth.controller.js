import User from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
  const {username, email, password} = req.body;
  const hashedPassworrd = bcryptjs.hashSync(password, 10)
  const newUser = new User({username, email, password: hashedPassworrd});
  try {
    await newUser.save();
    res.status(201).json({
      message: 'User created succesfully'
    });
    
  } catch (error) {
    next(error);
  }
};