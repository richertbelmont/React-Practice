const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const favoriteRoutes = require("./routes/favorites");

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect("mongodb://localhost:27017/movieapp", {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB"));

app.use("/api", authRoutes);
app.use("/api/favorites", favoriteRoutes);

app.listen(5000, () => console.log("Server running on port 5000"));