const express = require("express");
const {
  initiateDonation,
  verifyDonation,
  getDonations,
} = require("../controllers/donationController");

const router = express.Router();

router.post("/initiate", initiateDonation);
router.get("/verify/:reference", verifyDonation);
router.get("/", getDonations);

module.exports = router;
