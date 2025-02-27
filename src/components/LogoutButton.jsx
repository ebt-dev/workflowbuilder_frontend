// src/components/LogoutButton.jsx
import React, { useContext } from "react";
import { Button } from "@mui/material";
import { AuthContext } from "../context/AuthContext";

const LogoutButton = () => {
  const { isAuthenticated, logout } = useContext(AuthContext);

  if (!isAuthenticated) {
    return null; // No mostrar el botón si no hay sesión activa
  }

  return (
    <Button variant="contained" color="secondary" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;