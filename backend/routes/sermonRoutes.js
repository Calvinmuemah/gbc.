// routes/sermonRoutes.js
const express = require("express");
const {
  createSermon,
  getSermons,
  getSermonById,
  updateSermon,
  deleteSermon,
  getSermonCount,
} = require("../controllers/sermonController");

const router = express.Router();

// CRUD Routes
router.post("/create", createSermon);
router.get("/", getSermons);
router.get("/count", getSermonCount);
router.get("/:id", getSermonById);
router.put("/:id", updateSermon);
router.delete("/:id", deleteSermon);

module.exports = router;
