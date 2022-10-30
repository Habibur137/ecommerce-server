const express = require("express");
const cors = require("cors");
require("dotenv").config("./app");
const app = express();
app.use([cors(), express.json()]);

// routes setup here

//api health route
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: true,
    message: "sever is running perfectly",
  });
});

module.exports = app;
