const mongoose = require("mongoose");

const ministrySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      index: true, // helps in searching ministries
    },
    leader: {
      type: String,
      required: true,
      index: true, // fast lookup by leader name
    },
    email: {
      type: String,
      required: true,
      unique: true, // avoid duplicate ministry leader emails
      lowercase: true,
      index: true,
    },
    phone: {
      type: String,
      required: true,
    },
    members: {
      type: Number,
      default: 0,
    },
    description: {
      type: String,
      required: true,
    },
    avatar: {
      type: String,
      default: "",
    },
    status: {
      type: String,
      enum: ["active", "recruiting", "inactive"],
      default: "active",
      index: true,
    },
  },
  { timestamps: true }
);

// Add compound index for common queries (leader + status)
ministrySchema.index({ leader: 1, status: 1 });

const Ministry = mongoose.model("Ministry", ministrySchema);

module.exports = { Ministry };
