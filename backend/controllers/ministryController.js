const { Ministry } = require("../models/Ministry");

// ✅ Create ministry
const createMinistry = async (req, res) => {
  try {
    const { name, leader, email, phone, members, description, status } = req.body;

    const ministry = new Ministry({
      name,
      leader,
      email,
      phone,
      members,
      description,
      status,
      avatar: req.file ? req.file.path : "", // Cloudinary URL
    });

    await ministry.save();
    res.status(201).json(ministry);
  } catch (error) {
    res.status(400).json({ message: "Error creating ministry", error });
  }
};

// ✅ Get all ministries
const getMinistries = async (req, res) => {
  try {
    const ministries = await Ministry.find().sort({ createdAt: -1 });
    res.json(ministries);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ministries", error });
  }
};

// ✅ Get one ministry
const getMinistryById = async (req, res) => {
  try {
    const ministry = await Ministry.findById(req.params.id);
    if (!ministry) return res.status(404).json({ message: "Ministry not found" });
    res.json(ministry);
  } catch (error) {
    res.status(500).json({ message: "Error fetching ministry", error });
  }
};

// ✅ Update ministry
const updateMinistry = async (req, res) => {
  try {
    const updates = { ...req.body };
    if (req.file) updates.avatar = req.file.path; // update with new image

    const ministry = await Ministry.findByIdAndUpdate(req.params.id, updates, {
      new: true,
    });

    if (!ministry) return res.status(404).json({ message: "Ministry not found" });
    res.json(ministry);
  } catch (error) {
    res.status(400).json({ message: "Error updating ministry", error });
  }
};

// ✅ Delete ministry
const deleteMinistry = async (req, res) => {
  try {
    const ministry = await Ministry.findByIdAndDelete(req.params.id);
    if (!ministry) return res.status(404).json({ message: "Ministry not found" });
    res.json({ message: "Ministry deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting ministry", error });
  }
};


// ✅ Get ministries count
const getMinistriesCount = async (req, res) => {
  try {
    const count = await Ministry.countDocuments();
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: "Error fetching ministries count", error });
  }
};



module.exports = {
  createMinistry,
  getMinistries,
  getMinistryById,
  updateMinistry,
  deleteMinistry,
  getMinistriesCount,
};
