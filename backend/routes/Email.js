const express = require("express");
const router = express.Router();
const { shareSummary } = require("../controllers/Email");

// Share summary via email
router.post("/share", shareSummary);

module.exports = router;
