const Groq = require("groq-sdk");
const Summary = require("../models/Summary");
const Transcript = require("../models/Transcript");
require("dotenv").config();
const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

// Generate summary using AI
exports.generateSummary = async (req, res) => {
  try {
    console.log("Groq API Key:", process.env.GROQ_API_KEY ? "Loaded ✅" : "Missing ❌");

    const { transcriptId, prompt } = req.body;

    // Get transcript text from DB
    const transcript = await Transcript.findById(transcriptId);
    if (!transcript) return res.status(404).json({ error: "Transcript not found" });

    // Default prompt
    const finalPrompt = prompt && prompt.trim().length > 0
      ? prompt
      : "Summarize the following transcript into concise bullet points highlighting key decisions and action items.";

    // Call Groq API
    const completion = await groq.chat.completions.create({
      model: "llama3-8b-8192",
      messages: [
        { role: "system", content: "You are a meeting notes summarizer." },
        { role: "user", content: `${finalPrompt}\n\nTranscript:\n${transcript.content}` }
      ]
    });

    const summaryText = completion.choices[0]?.message?.content || "No content";


    // Save summary
    const newSummary = new Summary({
      transcriptId,
      summary: summaryText,
      prompt: finalPrompt
    });
    await newSummary.save();

    res.status(201).json({
      success: true,
      message: "Summary generated successfully",
      summary: newSummary
    });

  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to generate summary" });
  }
};
