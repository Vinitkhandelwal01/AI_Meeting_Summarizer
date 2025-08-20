const mongoose = require("mongoose");

const SummarySchema = new mongoose.Schema({
  transcriptId: { type: mongoose.Schema.Types.ObjectId, ref: "Transcript" }, // linked transcript
  summary: { type: String, required: true },
  prompt: { type: String },   // custom or default prompt used
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("Summary", SummarySchema);
