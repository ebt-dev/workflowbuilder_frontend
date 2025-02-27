// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const createWorkflow = async (name, description) => {
  const response = await axios.post(`${API_URL}/workflows`, { name, description });
  return response.data;
};

export const getWorkflows = async () => {
  const response = await axios.get(`${API_URL}/workflows`);
  return response.data;
};

export const createSubmission = async (workflowId, submittedBy) => {
  const response = await axios.post(`${API_URL}/submissions`, { workflowId, submittedBy });
  return response.data;
};

export const uploadFile = async (submissionId, file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("submissionId", submissionId);

  const response = await axios.post(`${API_URL}/files/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};
