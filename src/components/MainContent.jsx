// src/components/MainContent.jsx
import React from "react";
import { Box,Toolbar, Typography } from "@mui/material";

const MainContent = () => {
  return (
    <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
      <Toolbar /> {/* Espacio para la barra de navegación superior */}
      <Typography paragraph>
        Contenido principal del workflow.
      </Typography>
    </Box>
  );
};

export default MainContent;