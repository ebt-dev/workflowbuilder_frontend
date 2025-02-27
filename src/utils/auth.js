// src/utils/auth.js
import axios from "axios";

export const refreshAccessToken = async () => {
  const refreshToken = localStorage.getItem("refreshToken");

  if (!refreshToken) {
    throw new Error("No refresh token available.");
  }

  try {
    const response = await axios.post("http://localhost:3000/api/auth/refresh-token", {
      refreshToken,
    });

    if (response.data.accessToken) {
      localStorage.setItem("accessToken", response.data.accessToken);
      return response.data.accessToken;
    }
  } catch (error) {
    throw new Error("Failed to refresh access token.");
  }
};


export const logout = async () => {
    const userId = localStorage.getItem("userId");
  
    try {
      // Llamar al endpoint de cierre de sesión en el backend
      await axios.post("http://localhost:3000/api/auth/logout", { userId });
  
      // Eliminar los tokens y el ID del usuario de localStorage
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userId");
  
      // Redirigir al usuario a la página de inicio de sesión
      window.location.href = "/";
    } catch (error) {
      console.error("Error logging out:", error);
    }
  };