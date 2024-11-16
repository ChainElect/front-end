import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { ERROR_MESSAGES } from "../utilities/messages";
// Create the AuthContext
const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);

  // Check localStorage for token on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        // Decode the token to get the isAdmin value
        const decoded = jwtDecode(token);
        setIsLoggedIn(true);
        setIsAdmin(decoded.isAdmin || false);
      } catch (error) {
        console.error(ERROR_MESSAGES.FAILED_JTW_DECODING, error);
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  }, []);

  // Function to handle login, storing token and updating state
  const login = (token) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);

    // Decode the token to set isAdmin
    const decoded = jwtDecode(token);
    setIsAdmin(decoded.isAdmin || false);
  };

  // Function to handle logout
  const logout = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    setIsAdmin(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, isAdmin, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
