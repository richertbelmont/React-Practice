const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: { type: String, unique: true },
  passwordHash: String,
  favorites: Array
});

module.exports = mongoose.model("User", userSchema);