const mongoose = require("mongoose");

const donationSchema = new mongoose.Schema(
  {
    donor: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    method: { type: String, default: "M-Pesa" },
    status: {
      type: String,
      enum: ["pending", "completed", "failed"],
      default: "pending",
    },
    reference: {
      type: String,
      required: true,
      unique: true, // ✅ enforce unique values
    },
    date: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Donation", donationSchema);
