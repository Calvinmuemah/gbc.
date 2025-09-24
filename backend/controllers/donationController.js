const axios = require("axios");
const { v4: uuidv4 } = require("uuid");
const Donation = require("../models/Donations");

const PAYSTACK_SECRET = process.env.PAYSTACK_SECRET_KEY;

// Normalize phone to +254 format
const normalizePhone = (phone) => {
  let normalized = phone.trim();

  if (normalized.startsWith("07") || normalized.startsWith("01")) {
    normalized = `+254${normalized.substring(1)}`;
  } else if (normalized.startsWith("+254")) {
    // already good
  } else if (normalized.startsWith("254")) {
    normalized = `+${normalized}`;
  } else {
    throw new Error("Invalid Kenyan phone number format");
  }

  return normalized;
};

// @desc    Initialize a donation payment (STK Push via Paystack M-Pesa)
// @route   POST /api/donations/initiate
// @access  Public
const initiateDonation = async (req, res) => {
  try {
    const { donor, email, phone, amount, category } = req.body;

    if (!donor || !email || !phone || !amount || !category) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Normalize phone number to +254...
    const normalizedPhone = normalizePhone(phone);

    // Convert to kobo
    const paystackAmount = amount * 100;

    // Generate unique reference
    const reference = `DON-${uuidv4()}`;

    // Save donation in DB (pending)
    await Donation.create({
      donor,
      email,
      phone: normalizedPhone,
      amount,
      category,
      method: "M-Pesa",
      status: "pending",
      reference,
    });

    // Call Paystack Charge API for M-Pesa STK Push
    const response = await axios.post(
      "https://api.paystack.co/charge",
      {
        email,
        amount: paystackAmount,
        reference,
        mobile_money: {
          phone: normalizedPhone,
          provider: "mpesa",
        },
      },
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
          "Content-Type": "application/json",
        },
      }
    );

    res.status(200).json({
      message: "STK Push initiated",
      reference,
      status: response.data.status,
      data: response.data.data,
    });
  } catch (error) {
    console.error(
      "Error initiating donation:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Failed to initiate donation" });
  }
};

// @desc    Verify donation payment
// @route   GET /api/donations/verify/:reference
// @access  Public
const verifyDonation = async (req, res) => {
  try {
    const { reference } = req.params;

    const response = await axios.get(
      `https://api.paystack.co/transaction/verify/${reference}`,
      {
        headers: {
          Authorization: `Bearer ${PAYSTACK_SECRET}`,
        },
      }
    );

    const { status, customer, amount } = response.data.data;

    if (status === "success") {
      await Donation.findOneAndUpdate(
        { reference },
        { status: "completed" },
        { new: true }
      );
    } else {
      await Donation.findOneAndUpdate(
        { reference },
        { status: "failed" },
        { new: true }
      );
    }

    res.status(200).json({ status, customer, amount: amount / 100 });
  } catch (error) {
    console.error(
      "Error verifying donation:",
      error.response?.data || error.message
    );
    res.status(500).json({ message: "Failed to verify donation" });
  }
};

// @desc    Get all donations
// @route   GET /api/donations
// @access  Admin
const getDonations = async (req, res) => {
  try {
    const donations = await Donation.find().sort({ createdAt: -1 });
    res.json(donations);
  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { initiateDonation, verifyDonation, getDonations };
