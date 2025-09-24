const express = require("express");
const {
  createEvent,
  getEvents,
  getEventById,
  updateEvent,
  deleteEvent,
  getEventsCount,
  getUpcomingEventsCount,
} = require("../controllers/eventController");
const { verifyToken } = require("../middlewares/auth");

const router = express.Router();

// Public
router.get("/", getEvents);
router.get("/count", getEventsCount);
router.get("/:id", getEventById);
// Count of upcoming events
router.get("/upcoming/count", getUpcomingEventsCount);

// Protected
router.post("/create", verifyToken, createEvent);
router.put("/:id", verifyToken, updateEvent);
router.delete("/:id", verifyToken, deleteEvent);

module.exports = router;



