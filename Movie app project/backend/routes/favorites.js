const express = require("express");
const jwt = require("jsonwebtoken");
const User = require("../models/User");
const router = express.Router();

const authMiddleware = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    const decoded = jwt.verify(token, "your_secret");
    req.user = await User.findById(decoded.userId);
    next();
  } catch {
    res.status(401).json({ message: "Unauthorized" });
  }
};

router.get("/", authMiddleware, (req, res) => {
  res.json(req.user.favorites);
});

router.post("/", authMiddleware, async (req, res) => {
  const movie = req.body;
  req.user.favorites.push(movie);
  await req.user.save();
  res.json(req.user.favorites);
});

router.delete("/:id", authMiddleware, async (req, res) => {
  const movieId = req.params.id;
  req.user.favorites = req.user.favorites.filter(m => m.id != movieId);
  await req.user.save();
  res.json(req.user.favorites);
});

module.exports = router;