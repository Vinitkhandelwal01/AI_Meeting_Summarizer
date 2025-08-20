const mongoose = require("mongoose");

const TranscriptSchema = new mongoose.Schema({
  content: { type: String, required: true },  // transcript text
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Transcript", TranscriptSchema);
