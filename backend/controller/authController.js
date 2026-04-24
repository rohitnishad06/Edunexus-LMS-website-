import validator from "validator";
import bcrypt from "bcryptjs";
import genToken from "../config/token.js";
import userModel from "../model/userModel.js";
import sendMail from "../config/sendMail.js";

// SIGN UP CONTROLLER
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

    // Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ message: "Enter a valid email" });
    }

    // Ensure password strength
    if (password.length < 8) {
      return res.status(400).json({ message: "Enter a stronger password" });
    }

    // Encrypt password
    let hashPassword = await bcrypt.hash(password, 10);

    // Create new user 
    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      role,
    });

    // Generate JWT token for authentication
    let token = genToken(user._id);

    // Return success response with user data
    return res.status(201).json({user, token});
  } catch (error) {
    return res.status(500).json({ message: `signUp error: ${error}` });
  }
};

// LOGIN CONTROLLER
// ============================
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if user exists in database
    let user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Compare entered password 
    let isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Incorrect password" });
    }

    // Generate JWT token
    let token = genToken(user._id);

    // Return user data
    return res.status(200).json({user, token});

  } catch (error) {
    return res.status(500).json({ message: `login error: ${error}` });
  }
};

// LOGOUT CONTROLLER (optional)
// ============================
export const logOut = async (req, res) => {
  return res.status(200).json({ msg: "Logout Successfully" });
};

// Send OTP CONTROLLER
// ============================
export const sendOTP = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({
        message: "Email is required",
      });
    }

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    // Generate 6 digit OTP
    const otp = Math.floor(100000 + Math.random() * 900000).toString();

    user.resetOtp = otp;
    user.otpExpires = Date.now() + 5 * 60 * 1000;
    user.isOtpVerified = false;

    await user.save();

    await sendMail(email, otp);

    return res.status(200).json({
      message: "OTP sent successfully",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Server error while sending OTP",
    });
  }
};

// verify otp CONTROLLER
// ============================
export const verifyOTP = async (req, res) => {
  try {
    const { email, otp } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (user.resetOtp !== otp) {
      return res.status(400).json({ message: "Invalid OTP" });
    }

    if (user.otpExpires < Date.now()) {
      return res.status(400).json({ message: "OTP expired" });
    }

    user.isOtpVerified = true;
    await user.save();

    return res.status(200).json({ message: "OTP verified successfully" });
  } catch (error) {
    return res.status(500).json({ message: "Verify OTP error" });
  }
};

// Reset Password CONTROLLER
// ============================
export const resetPassword = async (req, res) => {
  try {
    const { email, newPassword } = req.body;

    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (!user.isOtpVerified) {
      return res.status(400).json({ message: "OTP not verified" });
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);

    user.password = hashedPassword;
    user.resetOtp = undefined;
    user.otpExpires = undefined;
    user.isOtpVerified = false;

    await user.save();

    return res.status(200).json({ message: "Password reset successful" });
  } catch (error) {
    return res.status(500).json({ message: "Reset password error" });
  }
};

// Google Auth
// ============================
export const googleAuth = async (req, res) => {
  try {
    const { email, name, role } = req.body;

    let user = await userModel.findOne({ email });

    if (!user) {
      user = await userModel.create({ email, name: name || "User", role: "student" });
    }

    // Generate JWT
    let token =  genToken(user._id);

    res.status(201).json({user, token});
  } catch (error) {
    res.status(201).json(`Google Auth error ${error}`);
  }
};
