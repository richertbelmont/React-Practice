const express = require("express");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

router.post("/register", async (req, res) => {
  const { username, password } = req.body;
  try {
    const existing = await User.findOne({ username });
    if (existing) return res.status(400).json({ message: "User already exists" });

    const hash = await bcrypt.hash(password, 10);
    const newUser = new User({ username, passwordHash: hash, favorites: [] });
    await newUser.save();

    const token = jwt.sign({ userId: newUser._id }, "your_secret", { expiresIn: "1h" });
    res.json({ token, user: { name: newUser.username } });
  } catch (err) {
    res.status(500).json({ message: "Registration failed" });
  }
});

router.post("/login", async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.passwordHash);
    if (!isMatch) return res.status(400).json({ message: "Incorrect password" });

    const token = jwt.sign({ userId: user._id }, "your_secret", { expiresIn: "1h" });
    res.json({ token, user: { name: user.username } });
  } catch (err) {
    res.status(500).json({ message: "Login failed" });
  }
});

module.exports = router;