import { useState } from "react";
import { Upload, Edit3, Sparkles, Send, Copy } from "lucide-react";
import { generateSummaryAPI, sendSummaryAPI, uploadTranscriptAPI} from "../services/operationAPI";

function Index() {
  const [transcriptId, setTranscriptId] = useState("");
  const [customPrompt, setCustomPrompt] = useState("");
  const [summary, setSummary] = useState("");
  const [summaryId, setSummaryId] = useState("");
  const [emails, setEmails] = useState("");
  const [transcriptText, setTranscriptText] = useState("");
  const [copy,setCopy] = useState(false);


  const handleFileUpload = async (event) => {
    const file = event.target.files?.[0];
    if (file && file.type === "text/plain") {
      const result = await uploadTranscriptAPI(file);
      console.log("Upload result:", result);

      if (result?.transcript?._id) {
        setTranscriptId(result.transcript._id);   
        setTranscriptText(result.transcript.content);
      } else {
        console.error("TranscriptId missing:", result);
      }
    }
  };



  const generateSummary = async () => {
  try {
    const result = await generateSummaryAPI(transcriptId, customPrompt);
    console.log("Generate summary result:", result);
    if (result?.success === true || result?.summary?._id) {
      setSummary(result.summary.summary);
      setSummaryId(result.summary._id);
    } else {
      alert("Failed to generate summary");
    }
  } catch (error) {
    alert("Error while generating summary");
  }
};

const sendEmail = async () => {
  try {
    const result = await sendSummaryAPI(summaryId, emails.split(","));
    if (result.message) {
      alert("Summary sent successfully!");
    } else {
      alert("Failed to send email");
    }
  } catch (error) {
    alert("Error while sending email");
  }
};

  const copyToClipboard = () => {
    navigator.clipboard.writeText(summary);
    setCopy(true);
    setTimeout(() => setCopy(false), 10000); // Reset copy state after 10 seconds
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="flex items-center gap-2 px-6 py-4 border-b shadow-sm">
        <div className="flex items-center justify-center w-10 h-10 bg-purple-600 text-white rounded-lg">
          <Sparkles className="w-6 h-6" />
        </div>
        <div>
          <h1 className="text-lg font-bold">SummarizerAI</h1>
          <p className="text-sm text-gray-500">
            AI-powered meeting notes summarizer
          </p>
        </div>
      </header>

      <main className="max-w-4xl mx-auto p-6 space-y-6">
        {/* Upload Transcript */}
        <div className="border rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <Upload className="w-5 h-5 text-purple-600" />
            Upload Meeting Transcript
          </h2>
          <label
            htmlFor="file-upload"
            className="block border-2 border-dashed border-gray-300 rounded-lg p-6 text-center cursor-pointer hover:border-purple-400"
          >
            <p className="text-purple-600 font-medium">
              Click to upload a .txt file
            </p>
            <p className="text-sm text-gray-500">or paste your transcript below</p>
            <input
              id="file-upload"
              type="file"
              accept=".txt"
              onChange={handleFileUpload}
              className="hidden"
            />
          </label>
          <textarea
            placeholder="Paste your meeting transcript here..."
            value={transcriptText}
            onChange={(e) => setTranscriptText(e.target.value)}
            className="w-full border rounded-md p-3 min-h-[120px] focus:ring-purple-500 focus:border-purple-500"
          />
          {transcriptText && (
            <p className="text-sm text-gray-500">
              {transcriptText.split(" ").length} words loaded
            </p>
          )}
        </div>

        {/* Summarization Instructions */}
        <div className="border rounded-lg p-6 space-y-4 shadow-sm">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <Edit3 className="w-5 h-5 text-purple-600" />
            Summarization Instructions
          </h2>
          <div className="grid grid-cols-2 gap-3">
            <button
              className="border rounded-md py-2 px-3 text-sm hover:bg-purple-50"
              onClick={() => setCustomPrompt("Summarize in bullet points for executives")}
            >
              Executive Summary
            </button>
            <button
              className="border rounded-md py-2 px-3 text-sm hover:bg-purple-50"
              onClick={() => setCustomPrompt("Highlight only action items and next steps")}
            >
              Action Items
            </button>
            <button
              className="border rounded-md py-2 px-3 text-sm hover:bg-purple-50"
              onClick={() => setCustomPrompt("Create a detailed technical summary")}
            >
              Technical Review
            </button>
            <button
              className="border rounded-md py-2 px-3 text-sm hover:bg-purple-50"
              onClick={() => setCustomPrompt("Extract key decisions and outcomes")}
            >
              Key Decisions
            </button>
          </div>
          <textarea
            placeholder="Describe how you want the summary formatted..."
            value={customPrompt}
            onChange={(e) => setCustomPrompt(e.target.value)}
            className="w-full border rounded-md p-3 min-h-[80px] focus:ring-purple-500 focus:border-purple-500"
          />
        </div>

        {/* Generate Summary */}
        <button
          onClick={generateSummary}
          className="w-full py-3 rounded-md bg-purple-600 text-white font-medium hover:bg-purple-700"
        >
          Generate AI Summary
        </button>

        {/* Generated Summary */}
        <div className="border rounded-lg p-6 shadow-sm">
          <h2 className="flex items-center gap-2 font-semibold text-lg">
            <Sparkles className="w-5 h-5 text-purple-600" />
            Generated Summary
            {summary &&  (
              <button onClick={copyToClipboard}  className="ml-auto text-sm text-purple-600 hover:underline">
                <Copy className="inline w-4 h-4 mr-1" />
                {copy ? "Copied" : "Copy"}
              </button>
            )}
          </h2>
          {summary ? (
            <textarea
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              className="w-full border rounded-md p-3 min-h-[150px] mt-3"
            />
          ) : (
            <p className="text-gray-500 mt-3">Your AI-generated summary will appear here...</p>
          )}
        </div>

        {/* Share Summary */}
        {summary && (
          <div className="border rounded-lg p-6 space-y-4 shadow-sm">
            <h2 className="flex items-center gap-2 font-semibold text-lg">
              <Send className="w-5 h-5 text-purple-600" />
              Share Summary
            </h2>
            <input
              type="text"
              placeholder="email1@example.com, email2@example.com"
              value={emails}
              onChange={(e) => setEmails(e.target.value)}
              className="w-full border rounded-md p-3"
            />
            <button
              onClick={sendEmail}
              className="w-full py-3 rounded-md bg-purple-400 text-white font-medium hover:bg-purple-500"
            >
              Send Summary
            </button>
          </div>
        )}
      </main>
    </div>
  );
}

export default Index;
