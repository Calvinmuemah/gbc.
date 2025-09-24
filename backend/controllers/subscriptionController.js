const Subscription = require("../models/Subscription");
const nodemailer = require("nodemailer");

// Email transporter (Gmail example, use SMTP for production)
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER, // your gmail
    pass: process.env.EMAIL_PASS, // your app password
  },
});

// Subscribe Controller
exports.subscribe = async (req, res) => {
  try {
    const { email } = req.body;

    if (!email) {
      return res.status(400).json({ message: "Email is required" });
    }

    // Save subscriber
    const subscription = new Subscription({ email });
    await subscription.save();

    // Notify Admin
    await transporter.sendMail({
      from: `"GBC Subscriptions" <${process.env.EMAIL_USER}>`,
      to: process.env.ADMIN_EMAIL,
      subject: "📥 New Subscriber!",
      html: `<p>A new user subscribed with email: <b>${email}</b></p>`,
    });

    // Send Welcome Email to Subscriber
    await transporter.sendMail({
      from: `"Glory Bible Church" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "🎉 Welcome to GBC Newsletter",
      html: `
        <h2>Welcome to Glory Bible Church!</h2>
        <p>Thank you for subscribing to our newsletter. Stay tuned for updates on services, events, and more.</p>
        <p>God bless you 🙏</p>
      `,
    });

    return res.status(201).json({ message: "Subscribed successfully" });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({ message: "Email already subscribed" });
    }
    console.error("Subscription error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};
