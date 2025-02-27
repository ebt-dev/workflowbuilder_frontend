// src/components/WorkflowDesigner.jsx
import React, { useState } from "react";
import {
  TextField,
  Button,
  Box,
  Typography,
  Grid,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const WorkflowDesigner = ({ onCreateWorkflow }) => {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [steps, setSteps] = useState([]);

  const handleAddStep = () => {
    setSteps([...steps, { stepName: "", fields: [] }]);
  };

  const handleAddField = (stepIndex) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].fields.push({ fieldType: "text", fieldLabel: "", fieldOptions: "", isRequired: false });
    setSteps(updatedSteps);
  };

  const handleStepChange = (stepIndex, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex][field] = value;
    setSteps(updatedSteps);
  };

  const handleFieldChange = (stepIndex, fieldIndex, field, value) => {
    const updatedSteps = [...steps];
    updatedSteps[stepIndex].fields[fieldIndex][field] = value;
    setSteps(updatedSteps);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Add stepOrder to each step
    const workflow = {
      name,
      description,
      steps: steps.map((step, index) => ({
        ...step,
        stepOrder: index + 1, // Assign stepOrder based on the index
      })),
    };

    try {
      // Use the onCreateWorkflow prop
      const newWorkflow = await onCreateWorkflow(workflow);
      console.log("Workflow created:", newWorkflow);
      setName("");
      setDescription("");
      setSteps([]);
    } catch (error) {
      console.error("Error creating workflow:", error);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h5">Create Workflow</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Workflow Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          fullWidth
          margin="normal"
          required
        />
        <TextField
          label="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          fullWidth
          margin="normal"
          multiline
          rows={4}
        />
        <Typography variant="h6" sx={{ mt: 2 }}>
          Steps
        </Typography>
        {steps.map((step, stepIndex) => (
          <Box key={stepIndex} sx={{ mt: 2, p: 2, border: "1px solid #ccc", borderRadius: 1 }}>
            <TextField
              label="Step Name"
              value={step.stepName}
              onChange={(e) => handleStepChange(stepIndex, "stepName", e.target.value)}
              fullWidth
              margin="normal"
              required
            />
            <Typography variant="subtitle1" sx={{ mt: 2 }}>
              Fields
            </Typography>
            {step.fields.map((field, fieldIndex) => (
              <Grid container spacing={2} key={fieldIndex} sx={{ mt: 1 }}>
                <Grid item xs={4}>
                  <FormControl fullWidth>
                    <InputLabel>Field Type</InputLabel>
                    <Select
                      value={field.fieldType}
                      onChange={(e) => handleFieldChange(stepIndex, fieldIndex, "fieldType", e.target.value)}
                      label="Field Type"
                      required
                    >
                      <MenuItem value="authentication">Authentication</MenuItem>
                      <MenuItem value="text">Text</MenuItem>
                      <MenuItem value="checkbox">Checkbox</MenuItem>
                      <MenuItem value="file">File Upload</MenuItem>
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={6}>
                  <TextField
                    label="Field Label"
                    value={field.fieldLabel}
                    onChange={(e) => handleFieldChange(stepIndex, fieldIndex, "fieldLabel", e.target.value)}
                    fullWidth
                    required
                  />
                </Grid>
                <Grid item xs={2}>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={field.isRequired}
                        onChange={(e) => handleFieldChange(stepIndex, fieldIndex, "isRequired", e.target.checked)}
                      />
                    }
                    label="Required"
                  />
                </Grid>
              </Grid>
            ))}
            <Button variant="outlined" onClick={() => handleAddField(stepIndex)} sx={{ mt: 2 }}>
              Add Field
            </Button>
          </Box>
        ))}
        <Button variant="outlined" onClick={handleAddStep} sx={{ mt: 2 }}>
          Add Step
        </Button>
        <Button type="submit" variant="contained" color="primary" sx={{ mt: 2 }}>
          Save Workflow
        </Button>
      </form>
    </Box>
  );
};

export default WorkflowDesigner;