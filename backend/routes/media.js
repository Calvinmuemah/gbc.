// src/routes/media.js
const express = require('express');
const { upload } = require('../config/cloudinary');
const { verifyToken, requireRole } = require('../middleware/auth');
const router = express.Router();

// Upload single file (image/video) and return secure url
// POST /api/media/upload  (form-data: file)
router.post('/upload',
  verifyToken,
  requireRole(['admin','superadmin','editor']),
  upload.single('file'),
  (req, res) => {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });
    // multer-storage-cloudinary attaches path property for Cloudinary
    res.json({ url: req.file.path, raw: req.file });
  }
);

module.exports = router;
