const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const UserModule = require("../models/user");
const User = UserModule.default || UserModule;


const router = express.Router();

const signupUser = async (req, res) => {
  console.log("Signup request body:", req.body);
  try {
    const { name, email, password } = req.body;

   const existing = await User.findOne({ email });
   console.log("Existing user check:", existing);
    if (existing) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const hashed = await bcrypt.hash(password, 10);
    const newUser = await User.create({ name, email, password: hashed });

    res.status(201).json({ success: true, message: "Signup successful", user: newUser });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}


const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (!user) return res.status(404).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

    const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_PRIVATE_KEY, {
      expiresIn: "7d",
    });

    res.status(200).json({ success: true, message: "Login successful", token, user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}

const authVerify = async (req, res) => {
  try {
    const userId = req.user.id;
    const foundUser = await User.findById(userId);
    if (!foundUser) {
      return res.status(404).json({ success: false, message: "User not found" });
    }

    const user = {
      id: foundUser._id,
      userName: foundUser.userName || foundUser.name,
      email: foundUser.email,
      role: foundUser.role,
    };

    res.status(200).json({ success: true, message: "User verified", user });
  } catch (err) {
    res.status(500).json({ success: false, message: "Server error", error: err.message });
  }
}


module.exports = {
  signupUser,
  loginUser,
  authVerify
};