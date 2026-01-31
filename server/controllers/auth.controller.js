import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { OAuth2Client } from "google-auth-library";

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

// 🔐 Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ userId }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });
};

// 🧹 Sanitize user (IMPORTANT)
const sanitizeUser = (user) => ({
  _id: user._id,
  name: user.name,
  email: user.email,
});

/* ===================== REGISTER ===================== */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "All fields are required" });

    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    const token = generateToken(newUser._id);

    res.status(201).json({
      user: sanitizeUser(newUser),
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== LOGIN ===================== */
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    const user = await User.findOne({ email });
    if (!user)
      return res.status(400).json({ message: "Invalid credentials" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch)
      return res.status(400).json({ message: "Invalid credentials" });

    const token = generateToken(user._id);

    res.status(200).json({
      user: sanitizeUser(user),
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

/* ===================== GOOGLE LOGIN ===================== */
export const googleLogin = async (req, res) => {
  try {
    const { tokenId } = req.body;
    if (!tokenId)
      return res.status(400).json({ message: "Token missing" });

    const ticket = await client.verifyIdToken({
      idToken: tokenId,
      audience: process.env.GOOGLE_CLIENT_ID,
    });

    const { email, name } = ticket.getPayload();

    let user = await User.findOne({ email });

    if (!user) {
      const randomPassword = await bcrypt.hash(
        email + process.env.JWT_SECRET,
        10
      );

      user = await User.create({
        name,
        email,
        password: randomPassword,
      });
    }

    const token = generateToken(user._id);

    res.status(200).json({
      user: sanitizeUser(user),
      token,
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};