const express = require("express");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const authMiddleware = require("./middleware/authMiddleware");
const userRouter = require("./routes/authRoute");

const app = express();

app.use(
  cors({
    origin: "*",
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.options("*", cors());

// body parsers
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

app.get("/api/v1/", authMiddleware, (req, res) => {
  res.json({
    message: "This is a protected route",
    user: req.user,
  });
});

app.use("/api/v1", userRouter);

module.exports = app;

