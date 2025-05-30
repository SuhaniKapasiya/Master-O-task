const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const {
  generateVerificationToken,
  verifyVerificationToken,
} = require("../utils/jwtUtil");
const { sendVerificationEmail } = require("../utils/mailer");
dotenv.config();

exports.register = async (req, res) => {
  try {
    const { username, email, password } = req.body;
    if (!username || !email || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ error: "Email already registered" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      username,
      email,
      password: hashedPassword,
    });
    const token = generateVerificationToken(user._id);
    await sendVerificationEmail(email, token);
    res.status(201).json({
      message:
        "Registration successful. Please verify your email before login.",
    });
  } catch (error) {
    console.log("Error: ", error);

    res.status(500).json({ error: error.message });
  }
};

exports.verifyEmail = async (req, res) => {
  try {
    const { token } = req.params;
    const payload = verifyVerificationToken(token);
    if (!payload)
      return res.status(400).json({ error: "Invalid or expired token" });
    const user = await User.findById(payload.userId);
    if (!user) return res.status(404).json({ error: "User not found" });
    if (user.isVerified)
      return res.status(400).json({ error: "User already verified" });
    user.isVerified = true;
    await user.save();

    res
      .status(200)
      .send("<h1>Email verified successfully!</h1><p>You can now login.</p>");
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ error: "Invalid credentials" });
    if (!user.isVerified)
      return res
        .status(403)
        .json({ error: "Please verify your email before login" });
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: "Invalid credentials" });
    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    res
      .status(200)
      .json({ token, user: { username: user.username, email: user.email } });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
