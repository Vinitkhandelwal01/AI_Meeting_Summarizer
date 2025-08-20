import { apiConnector } from "./apiConnector";

const BASE_URL = process.env.REACT_APP_BASE_URL || "http://localhost:4000/api/v1";

export const endpoints = {
  GENERATE_SUMMARY: `${BASE_URL}/summary/generate`,
  SEND_SUMMARY: `${BASE_URL}/email/share`, 
  UPLOAD_TRANSCRIPT: `${BASE_URL}/transcript/upload`
};
// -------- Upload Transcript ----------
export const uploadTranscriptAPI = async (file) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await apiConnector(
      "POST",
      endpoints.UPLOAD_TRANSCRIPT,
      formData,
      // {
      //   "Content-Type": "multipart/form-data",
      // }
    );

    return response?.data; // contains transcript._id
  } catch (error) {
    console.error("Error in uploadTranscriptAPI:", error?.response?.data || error);
    throw error;
  }
};

// -------- Generate Summary ----------
export const generateSummaryAPI = async (transcriptId, prompt) => {
  try {
    const response = await apiConnector("POST", endpoints.GENERATE_SUMMARY, {
      transcriptId,
      prompt,
    });
    return response?.data; // contains summary._id
  } catch (error) {
    console.error("Error in generateSummaryAPI:", error?.response?.data || error);
    throw error;
  }
};

// -------- Send Summary via Email ----------
export const sendSummaryAPI = async (summaryId, recipients) => {
  try {
    const response = await apiConnector("POST", endpoints.SEND_SUMMARY, {
      summaryId,
      recipients,
    });
    return response?.data;
  } catch (error) {
    console.error("Error in sendSummaryAPI:", error?.response?.data || error);
    throw error;
  }
};