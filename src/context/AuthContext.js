// src/context/AuthContext.js
import React, { createContext, useState, useEffect } from "react";

// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  // Check localStorage for token on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token); // Set to true if token exists, otherwise false
  }, []);

  // Function to handle login, storing token and updating state
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
