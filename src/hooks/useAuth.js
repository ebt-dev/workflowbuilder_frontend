import { useState, useEffect } from "react";

const useAuth = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    // Verificar si hay un accessToken en localStorage
    const accessToken = localStorage.getItem("accessToken");
    setIsAuthenticated(!!accessToken); // true si existe, false si no
  }, []);

  return isAuthenticated;
};

export default useAuth;