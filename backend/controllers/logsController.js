const Donation = require("../models/Donations");
const Event = require("../models/Event");
const Activity = require("../models/Sermon"); // if you have one

// @desc    Get all logs (merged feed)
// @route   GET /api/logs
// @access  Admin/Public (decide based on your app)
const getLogs = async (req, res) => {
  try {
    // Fetch latest donations
    const donations = await Donation.find()
      .select("donor amount createdAt")
      .lean();

    // Fetch latest events
    const events = await Event.find()
      .select("title date createdAt")
      .lean();

    // Fetch latest activities (if exists)
    const activities = await Activity.find().lean();

    // Format into one log structure
    const logs = [
      ...donations.map((d) => ({
        type: "donation",
        title: `Donation from ${d.donor} - KES ${d.amount}`,
        time: d.createdAt,
      })),
      ...events.map((e) => ({
        type: "event",
        title: `Event created: ${e.title}`,
        time: e.createdAt,
      })),
      ...activities.map((a) => ({
        type: "activity",
        title: a.title,
        time: a.createdAt,
      })),
    ];

    // Sort by latest
    logs.sort((a, b) => new Date(b.time) - new Date(a.time));

    res.status(200).json(logs);
  } catch (error) {
    console.error("Error fetching logs:", error.message);
    res.status(500).json({ message: "Failed to fetch logs" });
  }
};

module.exports = { getLogs };
