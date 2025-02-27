// src/pages/WorkflowPage.jsx
import React, { useState, useEffect } from "react";
import { Typography, Box, List, ListItem, ListItemText, Button } from "@mui/material";
import { getWorkflows, createWorkflow, getWorkflowById } from "../services/api";
import WorkflowDesigner from "../components/WorkflowDesigner";

const WorkflowPage = () => {
  const [workflows, setWorkflows] = useState([]);
  const [selectedWorkflow, setSelectedWorkflow] = useState(null);

  useEffect(() => {
    const fetchWorkflows = async () => {
      const data = await getWorkflows();
      console.log("getWF: " + data)
      setWorkflows(data);
    };
    //fetchWorkflows();
  }, []);

  const handleCreateWorkflow = async (workflow) => {
    console.log("Creating workflow:", workflow); // Add this line
    const newWorkflow = await createWorkflow(workflow);
    setWorkflows([...workflows, newWorkflow]);
  };

  const handleWorkflowClick = async (id) => {
    const workflow = await getWorkflowById(id);
    setSelectedWorkflow(workflow);
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">Workflows</Typography>
      {/* Pass handleCreateWorkflow as a prop */}
      <WorkflowDesigner onCreateWorkflow={handleCreateWorkflow} />
      <List>
        {workflows.map((workflow) => (
          <ListItem key={workflow.id} button onClick={() => handleWorkflowClick(workflow.id)}>
            <ListItemText primary={workflow.name} secondary={workflow.description} />
          </ListItem>
        ))}
      </List>
      {selectedWorkflow && (
        <Box sx={{ mt: 4 }}>
          <Typography variant="h5">{selectedWorkflow.name}</Typography>
          <Typography variant="body1">{selectedWorkflow.description}</Typography>
          {/* Render steps and fields here */}
        </Box>
      )}
    </Box>
  );
};

export default WorkflowPage;