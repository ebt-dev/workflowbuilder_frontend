// src/components/OptionsPanel.jsx
import React from "react";
import { Box, Typography } from "@mui/material";

const OptionsPanel = () => {
  return (
    <Box
      sx={{
        width: 300,
        flexShrink: 0,
        borderLeft: "1px solid #e0e0e0",
        p: 2,
      }}
    >
      <Typography variant="h6">Opciones del Campo</Typography>
      <Typography>
        Aquí se mostrarán las opciones del campo o componente seleccionado.
      </Typography>
    </Box>
  );
};

export default OptionsPanel;