// src/components/FormRenderer.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Snackbar,
  Alert,
} from "@mui/material";
import { useParams } from "react-router-dom";
import { getWorkflowById, createSubmission, uploadFile } from "../services/api";
import AuthenticationStep from "./AuthenticationStep";


const FormRenderer = () => {
  const { id } = useParams(); // Get workflow ID from the URL
  const [workflow, setWorkflow] = useState(null);
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({}); // Store validation errors
  const [snackbarOpen, setSnackbarOpen] = useState(false); // For showing validation messages
  const [currentStep, setCurrentStep] = useState(0); // Track the current step

  // Fetch workflow data
  React.useEffect(() => {
    const fetchWorkflow = async () => {
      const data = await getWorkflowById(id);
      console.log("DATA: " + JSON.stringify(data));
      localStorage.setItem("currentWorkflowId", id);
      setWorkflow(data);
    };
    fetchWorkflow();
  }, [id]);

  // Handle form field changes
  const handleChange = (stepId, fieldId, value) => {
    console.log("Value: " + value);
    setFormData((prevData) => ({
      ...prevData,
      [`step_${stepId}_field_${fieldId}`]: value,
    }));
    console.log(JSON.stringify(formData));
  };

  // Validate the current step
  const validateStep = () => {
    const newErrors = {};
    const step = workflow.steps[currentStep];

    step.fields.forEach((field) => {
      const key = `step_${step.id}_field_${field.id}`;

      // Check if the field is required and empty
      if (field.isRequired && !formData[key]) {
        newErrors[key] = "This field is required.";
      }
    });

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle next step
  const handleNextStep = () => {
    if (!validateStep()) {
      setSnackbarOpen(true); // Show validation error message
      return;
    }

    if (currentStep < workflow.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  // Handle previous step
  const handlePreviousStep = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateStep()) {
      setSnackbarOpen(true); // Show validation error message
      return;
    }

    console.log("FormData: " + JSON.stringify(formData));

    // Prepare submission data
    const submission = {
      workflowId: id,
      data: formData,
    };

    try {
      // Submit form data
      const result = await createSubmission(submission, "David");
      console.log("Submission created:", result);
      alert("Form submitted successfully!");
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("Failed to submit form.");
    }
  };

  if (!workflow) {
    return <Typography>Loading...</Typography>;
  }

  const step = workflow.steps[currentStep];

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">{workflow.name}</Typography>
      <Typography variant="body1">{workflow.description}</Typography>
      {step.step_name === "Authentication" || step.step_name === "Login" ? (
        <AuthenticationStep
          onNext={(authData) => {
            // Save authentication data to formData
            setFormData((prevData) => ({
              ...prevData,
              ...authData,
            }));
            handleNextStep();
          }}
          onPrevious={handlePreviousStep}
          isFirstStep={currentStep === 0}
          isLastStep={currentStep === workflow.steps.length - 1}
        />
      ) : (
        <form>
          <Typography variant="h6">{step.step_name}</Typography>
          {step.fields.map((field, fieldIndex) => (
            <Box key={field.id} sx={{ mt: 2 }}>
              {field.field_type === "text" && (
                <TextField
                  label={field.field_label}
                  value={formData[`step_${step.id}_field_${field.id}`] || ""}
                  onChange={(e) => handleChange(step.id, field.id, e.target.value)}
                  fullWidth
                  required={field.isRequired}
                  error={!!errors[`step_${step.id}_field_${field.id}`]}
                  helperText={errors[`step_${step.id}_field_${field.id}`]}
                />
              )}
            </Box>
          ))}
          <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
            <Button
              variant="contained"
              onClick={handlePreviousStep}
              disabled={currentStep === 0}
            >
              Previous
            </Button>
            {currentStep < workflow.steps.length - 1 ? (
              <Button variant="contained" onClick={handleNextStep}>
                Next
              </Button>
            ) : (
              <Button variant="contained" onClick={handleSubmit}>
                Submit
              </Button>
            )}
          </Box>
        </form>
      )}

      {/* Snackbar for validation errors */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: "100%" }}>
          Please fill out all required fields.
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default FormRenderer;