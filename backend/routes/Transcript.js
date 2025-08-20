const express = require("express");
const router = express.Router();
const upload = require("../middlewares/fileUpload"); // multer middleware
const { uploadTranscript } = require("../controllers/Transcript");

// Upload transcript (with .txt file)
router.post("/upload", upload.single("file"), uploadTranscript);

module.exports = router;
