const EmailLog = require("../models/EmailLog");
const Summary = require("../models/Summary");
const mailSender = require("../utills/mailSender");

exports.shareSummary = async (req, res) => {
  try {
    const { summaryId, recipients } = req.body;

    const summary = await Summary.findById(summaryId);
    if (!summary) {
      return res.status(404).json({ error: "Summary not found" });
    }

    // Call mailSender util
    await mailSender(
      recipients, 
      "Meeting Summary",   // subject
      summary.summary      // body (HTML supported)
    );

    // Save log in DB
    const log = new EmailLog({ summaryId, recipients });
    await log.save();

    res.json({ message: "Email sent successfully", log });

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ error: "Failed to send email" });
  }
};
