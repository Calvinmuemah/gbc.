const express = require("express");
const {
  createMinistry,
  getMinistries,
  getMinistryById,
  updateMinistry,
  deleteMinistry,
  getMinistriesCount,
} = require("../controllers/ministryController");
const { upload } = require("../middlewares/upload"); // 👈 check folder name

const router = express.Router();

// ✅ Create Ministry (with avatar upload)
router.post("/create", upload.single("avatar"), createMinistry);

// ✅ Get all ministries
router.get("/", getMinistries);

// ✅ Get ministries count
router.get("/count", getMinistriesCount);

// ✅ Get a single ministry
router.get("/:id", getMinistryById);

// ✅ Update ministry (can also upload new avatar)
router.put("/:id", upload.single("avatar"), updateMinistry);

// ✅ Delete ministry
router.delete("/:id", deleteMinistry);

module.exports = router;

// protected
// const express = require("express");
// const {
//   createMinistry,
//   getMinistries,
//   getMinistryById,
//   updateMinistry,
//   deleteMinistry,
//   getMinistriesCount,
// } = require("../controllers/ministryController");
// const { upload } = require("../middlewares/upload");
// const { verifyToken } = require("../middlewares/auth"); // ✅ import middleware

// const router = express.Router();

// // ✅ Public routes
// router.get("/", getMinistries);
// router.get("/count", getMinistriesCount);
// router.get("/:id", getMinistryById);

// // ✅ Protected routes
// router.post("/create", verifyToken, upload.single("avatar"), createMinistry);
// router.put("/:id", upload.single("avatar"), updateMinistry);
// router.delete("/:id", verifyToken, deleteMinistry);

// module.exports = router;
