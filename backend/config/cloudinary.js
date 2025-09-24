// src/config/cloudinary.js
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

// Optional: test connection
(async () => {
  try {
    const result = await cloudinary.api.ping();
    console.log("✅ Cloudinary connected:", result.status);
  } catch (err) {
    console.error("❌ Cloudinary connection failed:", err.message);
  }
})();

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "church_app",
    resource_type: "auto",
  },
});

const upload = multer({ storage });

module.exports = { cloudinary, upload };
