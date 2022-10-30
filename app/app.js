const express = require("express");
const cors = require("cors");
require("dotenv").config("./app");
const app = express();
const userRouter = require("../routes/v1/user.routes");
app.use([cors(), express.json()]);

// routes setup here
app.use("/api/v1/", userRouter);

//api health route
app.get("/health", (_req, res) => {
  res.status(200).json({
    status: true,
    message: "sever is running perfectly",
  });
});

module.exports = app;
