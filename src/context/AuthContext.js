import React, { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import * as Sentry from "@sentry/react";
import Proptypes from "prop-types";

import { ERROR_MESSAGES } from "../utilities/messages/errorMessages";

export const AuthContext = createContext();

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
        Sentry.captureException(error, {
          extra: {
            errorCode: ERROR_MESSAGES.FAILED_JTW_DECODING.code,
            errorMessage: ERROR_MESSAGES.FAILED_JTW_DECODING.message,
          },
        });
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

AuthProvider.propTypes = {
  children: Proptypes.node,
};
