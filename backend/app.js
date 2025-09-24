// src/app.js
require("dotenv").config();
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const rateLimit = require("express-rate-limit");

const app = express();

// Security & middleware
app.use(helmet());
app.use(cors({ origin: true, credentials: true }));
app.use(express.json({ limit: "10mb" }));

// Rate limiter
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 mins
  max: 200,
  standardHeaders: true,
  legacyHeaders: false,
});
app.use(limiter);

// Routes
app.use("/api/auth", require("./routes/auth"));
app.use("/api/ministries", require("./routes/ministryRoutes"));
app.use("/api/events", require("./routes/eventRoutes"));
app.use("/api/sermons", require("./routes/sermonRoutes"));
app.use("/api/donations", require("./routes/donationRoutes"));
app.use("/api/logs", require("./routes/logsRoutes"));
app.use("/api/subscribe", require("./routes/subscriptionRoutes"));
// app.use("/api/media", mediaRoutes);

// Health check
app.get("/health", (req, res) => res.json({ ok: true }));

module.exports = app;
