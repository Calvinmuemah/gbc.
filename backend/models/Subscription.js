const mongoose = require("mongoose");

const subscriptionSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: true,
      unique: true, // avoid duplicate emails
      match: [/^\S+@\S+\.\S+$/, "Invalid email format"],
    },
    createdAt: {
      type: Date,
      default: Date.now,
    },
  },
  { versionKey: false }
);

module.exports = mongoose.model("Subscription", subscriptionSchema);
