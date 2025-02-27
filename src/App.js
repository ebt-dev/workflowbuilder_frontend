import React from "react";
import { Box, CssBaseline , Toolbar} from "@mui/material";
import { Routes, Route } from "react-router-dom"; // Importa Routes y Route
import Navbar from "./components/Navbar";
import Sidebar from "./components/Sidebar";
import MainContent from "./components/MainContent";
import OptionsPanel from "./components/OptionsPanel";
import WorkflowsPage from "./pages/WorkflowPage"; // Importa la página de Workflows
import HomePage from "./pages/HomePage"; // Importa la página de Inicio

const App = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline /> {/* Normaliza los estilos */}
      <Navbar /> {/* Barra de navegación superior */}
      <Sidebar /> {/* Menú lateral izquierdo */}

      {/* Contenedor principal */}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar /> {/* Espacio para la barra de navegación superior */}
        <Routes>
          <Route path="/" element={<HomePage />} /> {/* Ruta para la página de inicio */}
          <Route path="/workflows" element={<WorkflowsPage />} /> {/* Ruta para la página de workflows */}
        </Routes>
      </Box>

      <OptionsPanel /> {/* Columna emergente (derecha) */}
    </Box>
  );
};

export default App;