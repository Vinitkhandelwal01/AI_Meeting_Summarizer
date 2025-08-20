const mongoose = require("mongoose");

const EmailLogSchema = new mongoose.Schema({
  summaryId: { type: mongoose.Schema.Types.ObjectId, ref: "Summary" },
  recipients: [{ type: String }],   // multiple email addresses
  sentAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model("EmailLog", EmailLogSchema);
