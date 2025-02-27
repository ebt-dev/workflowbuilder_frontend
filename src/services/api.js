// src/services/api.js
import axios from "axios";

const API_URL = "http://localhost:3000/api";

export const createWorkflow = async (workflow) => {
  const response = await axios.post(`${API_URL}/workflows`, workflow);
  return response.data;
};

export const getWorkflows = async () => {
  const response = await axios.get(`${API_URL}/workflows`);
  return response.data;
};

export const getWorkflowById = async (id) => {
  const response = await axios.get(`${API_URL}/workflows/${id}`);
  return response.data;
};

export const createSubmission = async (workflowId, submittedBy) => {
  console.log("Submission: "+ JSON.stringify(workflowId), JSON.stringify(submittedBy))
  const response = await axios.post(`${API_URL}/submissions`, { workflowId, submittedBy });
  return response.data;
};


export const uploadFile = async (submissionId, fieldId,  file) => {
  const formData = new FormData();
  formData.append("file", file);
  formData.append("submissionId", submissionId);
  formData.append("fieldId", fieldId);

  const response = await axios.post(`${API_URL}/files/upload`, formData, {
    headers: { "Content-Type": "multipart/form-data" },
  });
  return response.data;
};