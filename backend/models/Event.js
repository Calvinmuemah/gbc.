const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    description: { type: String, required: true },
    date: { type: Date, required: true, index: true }, // one event day
    time: { type: String, required: true }, // store as "HH:mm"
    location: { type: String, required: true },
    attendees: { type: Number, default: 0 },
    maxAttendees: { type: Number, required: true },
    status: {
      type: String,
      enum: ["upcoming", "completed", "cancelled"],
      default: "upcoming",
    },
    banner: { type: String }, // optional image
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// indexing for search
eventSchema.index({ title: "text", description: "text" });
eventSchema.index({ date: 1 });

module.exports = mongoose.model("Event", eventSchema);
