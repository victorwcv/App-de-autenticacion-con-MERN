import mongoose from "mongoose";

// Define the schema for the User model
const userSchema = new mongoose.Schema(
  {
    // Define properties of the user schema
    username: {
      type: String,
      required: true,
      unique: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilePicture: {
      type: String,
      default:
        "https://static.vecteezy.com/system/resources/previews/005/544/718/non_2x/profile-icon-design-free-vector.jpg",
    },
  },
  // Add timestamps for createdAt and updatedAt fields
  { timestamps: true }
);

// Create a mongoose model from the schema
const User = mongoose.model("User", userSchema);

// Export the User model
export default User;
