const mongoose = require("mongoose");

const sermonSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, index: true },
    speaker: { type: String, required: true, index: true },
    description: { type: String },
    date: { type: Date, required: true, index: true },
    duration: { type: String }, // e.g. "45 min"
    views: { type: Number, default: 0 },
    status: { type: String, enum: ["draft", "published"], default: "draft" },
    videoUrl: { type: String },
    audioUrl: { type: String },
    thumbnail: { type: String },
    tags: [String],
    createdBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

// Text index for search across title, description, speaker
sermonSchema.index({ title: "text", description: "text", speaker: "text" });
sermonSchema.index({ date: -1, title: 1 });

module.exports = mongoose.model("Sermon", sermonSchema);
