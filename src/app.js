const express = require("express");
const authRouter = require("./routes/auth.route");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get("/", (_req, res) => {
  res.status(200).json({
    message: "Instaclone backend is running",
    availableRoutes: [
      "GET /",
      "GET /health",
      "GET /api/auth",
      "GET /api/auth/register",
      "POST /api/auth/register",
    ],
  });
});

app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok" });
});

app.use("/api/auth", authRouter);

module.exports = app;
