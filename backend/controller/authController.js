import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import userModel from "../model/userModel.js";


// ============================
// SIGN UP CONTROLLER
// Route: POST /api/auth/signup
// Description: Register a new user
// ============================
export const signUp = async (req, res) => {
  try {
    // Extract user details from request body
    const { name, email, password, role } = req.body;

    // Check if user already exists in database
    let existUser = await userModel.findOne({ email });
    if (existUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Validate email format using validator package
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    // Ensure password strength (minimum 8 characters)
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter a stronger password" });
    }

    // Encrypt password using bcrypt before saving
    let hashPassword = await bcrypt.hash(password, 10);

    // Create new user in the database
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    // Generate JWT token for authentication
    let token = await genToken(user._id);

    // Store token in an HTTP-only cookie (secure against XSS)
    res.cookie("token", token, {
      httpOnly: true,
      secure: false, // Set to true in production (HTTPS)
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 days
    });

    // Return success response with user data
    return res.status(201).json(user);

  } catch (error) {
    return res.status(500).json({message: `signUp error: ${error}`});
  }
};


// ============================
// LOGIN CONTROLLER
// Route: POST /api/auth/login
// Description: Authenticate user & issue token
// ============================
export const login = async (req, res) => {
  try {

    // Extract credentials from request body
    const { email, password } = req.body;

    // Check if user exists in database
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare entered password with hashed password
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token after successful login
    let token = await genToken(user._id);

    // Store token in cookie
    res.cookie("token", token, {
      httpOnly: true,
      secure: false,
      sameSite: "strict",
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });

    // Return user data
    return res.status(200).json(user);

  } catch (error) {
    return res.status(500).json({message: `login error: ${error}`});
  }
};


// ============================
// LOGOUT CONTROLLER
// Route: POST /api/auth/logout
// Description: Clear token cookie to logout user
// ============================
export const logOut = async (req, res) => {
  try {

    // Clear authentication token from cookies
    await res.clearCookie("token");

    // Return success message
    return res.status(200).json({ message: "Logged out successfully" });

  } catch (error) {
    return res.status(500).json({message: `logOut error: ${error}`});
  }
};
