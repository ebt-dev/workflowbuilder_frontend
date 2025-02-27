// src/pages/HomePage.jsx
import React from "react";
import { Typography, Box } from "@mui/material";

const HomePage = () => {
  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h4">Welcome to Workflow Builder</Typography>
      <Typography variant="body1">Create and manage workflows with ease.</Typography>
    </Box>
  );
};

export default HomePage;
