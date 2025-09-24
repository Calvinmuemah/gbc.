// controllers/sermonController.js
const Sermon = require("../models/Sermon");

// @desc   Create a new sermon
// @route  POST /api/sermons/create
exports.createSermon = async (req, res) => {
  try {
    const sermon = new Sermon(req.body);
    await sermon.save();
    res.status(201).json(sermon);
  } catch (error) {
    res.status(400).json({ message: "Error creating sermon", error: error.message });
  }
};

// @desc   Get all sermons (with search + filter)
// @route  GET /api/sermons
exports.getSermons = async (req, res) => {
  try {
    const { search, status } = req.query;
    let filter = {};

    if (status && status !== "all") {
      filter.status = status;
    }

    let query = Sermon.find(filter).sort({ date: -1 });

    if (search) {
      query = query.find({ $text: { $search: search } });
    }

    const sermons = await query.exec();
    res.json(sermons);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sermons", error: error.message });
  }
};

// @desc   Get single sermon by ID
// @route  GET /api/sermons/:id
exports.getSermonById = async (req, res) => {
  try {
    const sermon = await Sermon.findById(req.params.id);
    if (!sermon) return res.status(404).json({ message: "Sermon not found" });
    res.json(sermon);
  } catch (error) {
    res.status(500).json({ message: "Error fetching sermon", error: error.message });
  }
};

// @desc   Update sermon
// @route  PUT /api/sermons/:id
exports.updateSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!sermon) return res.status(404).json({ message: "Sermon not found" });
    res.json(sermon);
  } catch (error) {
    res.status(400).json({ message: "Error updating sermon", error: error.message });
  }
};

// @desc   Delete sermon
// @route  DELETE /api/sermons/:id
exports.deleteSermon = async (req, res) => {
  try {
    const sermon = await Sermon.findByIdAndDelete(req.params.id);
    if (!sermon) return res.status(404).json({ message: "Sermon not found" });
    res.json({ message: "Sermon deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting sermon", error: error.message });
  }
};

// @desc    Get total count of sermons
// @route   GET /api/sermons/count
// @access  Public (or protect if needed)
exports.getSermonCount = async (req, res) => {
  try {
    const count = await Sermon.countDocuments();
    res.status(200).json({ count });
  } catch (err) {
    console.error("Error fetching sermon count:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};