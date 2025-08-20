const fs = require("fs");
const Transcript = require("../models/Transcript");

exports.uploadTranscript = async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    console.log("File received:", req.file);  // debug log

    // Read file content
    const content = fs.readFileSync(req.file.path, "utf-8");

    // Save to DB
    const newTranscript = new Transcript({ content });
    await newTranscript.save();

    res.status(201).json({
      success: true,
      message: "Transcript uploaded successfully",
      transcript: {
        _id: newTranscript._id,
        content: newTranscript.content,
      },
    });

  } catch (error) {
    console.error("Upload error:", error);
    res.status(500).json({ error: "Failed to upload transcript" });
  }
};
