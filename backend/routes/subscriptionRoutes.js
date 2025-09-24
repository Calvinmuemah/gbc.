const express = require("express");
const router = express.Router();
const { subscribe } = require("../controllers/subscriptionController");

// POST /api/subscribe
router.post("/", subscribe);

module.exports = router;
