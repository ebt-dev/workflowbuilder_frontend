// src/components/AuthenticationStep.jsx
import React, { useState, useContext } from "react";
import { TextField, Button, Box, Typography, Snackbar, Alert } from "@mui/material";
import axios from "axios";
import { AuthContext } from "../context/AuthContext";

const AuthenticationStep = ({ onNext, onPrevious, isFirstStep, isLastStep }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({});
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const { login } = useContext(AuthContext); // Usar el contexto de autenticación

  // Validate email and password
  const validate = () => {
    const newErrors = {};

    if (!email) {
      newErrors.email = "Email is required.";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Invalid email address.";
    }

    if (!password) {
      newErrors.password = "Password is required.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle next step
  const handleNext = async () => {
    if (!validate()) {
      setSnackbarMessage("Please fill out all required fields.");
      setSnackbarOpen(true);
      return;
    }

    try {
      // Send credentials to the backend for validation
      const response = await axios.post("http://localhost:3000/api/auth/validate-credentials", {
        email,
        password,
      });

      if (response.data.accessToken) {
        // Guardar el accessToken en localStorage y actualizar el estado de autenticación
        login(response.data.accessToken);

        // Call the onNext callback with the authentication data
        onNext({ email, password });
      }
    } catch (error) {
      if (error.response && error.response.data.error) {
        setSnackbarMessage(error.response.data.error);
      } else {
        setSnackbarMessage("An error occurred. Please try again.");
      }
      setSnackbarOpen(true);
    }
  };

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6">Authentication</Typography>
      <TextField
        label="Email"
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.email}
        helperText={errors.email}
      />
      <TextField
        label="Password"
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        fullWidth
        margin="normal"
        error={!!errors.password}
        helperText={errors.password}
      />
      <Box sx={{ mt: 4, display: "flex", justifyContent: "space-between" }}>
        <Button
          variant="contained"
          onClick={onPrevious}
          disabled={isFirstStep}
        >
          Previous
        </Button>
        {isLastStep ? (
          <Button variant="contained" onClick={handleNext}>
            Submit
          </Button>
        ) : (
          <Button variant="contained" onClick={handleNext}>
            Next
          </Button>
        )}
      </Box>

      {/* Snackbar for validation errors */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="error" sx={{ width: "100%" }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default AuthenticationStep;