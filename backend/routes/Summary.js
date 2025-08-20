const express = require("express");
const router = express.Router();
const { generateSummary } = require("../controllers/Summary");

// Generate summary from transcript + prompt
router.post("/generate", generateSummary);

module.exports = router;
