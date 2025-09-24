// src/routes/auth.js
const express = require("express");
const { register, login } = require("../controllers/auth");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

// Public routes
router.post("/register", register);
router.post("/login", login);

// Example protected route
router.get("/me", verifyToken, (req, res) => {
  res.json({ message: "Protected route", user: req.user });
});

module.exports = router;
