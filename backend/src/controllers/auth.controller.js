import User from "../models/User.model.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Naya account banane ka logic (Modified & Fixed)
export const register = async (req, res) => {
  try {
    // 🔥 Frontend se firstName/lastName ya name dono ko handle karne ke liye
    const { name, firstName, lastName, email, password } = req.body;
    
    // Agar alag fields hain toh unhe combine karke name bana lenge
    const fullName = name || `${firstName || ""} ${lastName || ""}`.trim();

    if (!email || !password) {
      return res.status(400).json({ success: false, message: "Please provide email and password" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name: fullName || "User",
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();

    // 🔥 Response mein success aur userId bhej rahe hain taaki frontend seedha store kar sake
    res.status(201).json({
      success: true,
      message: "User registered successfully",
      userId: savedUser._id,
      user: {
        id: savedUser._id,
        name: savedUser.name,
        email: savedUser.email
      }
    });

  } catch (error) {
    console.error("Register error:", error);
    res.status(500).json({ success: false, message: "Server error", error: error.message });
  }
};

// Login karne ka logic
export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const isPasswordCorrect = await bcrypt.compare(password, user.password);
    if (!isPasswordCorrect) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = jwt.sign(
      { userId: user._id, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" }
    );

    res.status(200).json({
      message: "Login successful",
      token: token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      }
    });
  } catch (error) {
    res.status(500).json({ message: "Server error", error: error.message });
  }
};