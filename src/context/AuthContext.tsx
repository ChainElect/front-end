import React, { createContext, useState, useEffect, FC } from "react";
import { jwtDecode } from "jwt-decode";
import * as Sentry from "@sentry/react";

import { ERROR_MESSAGES } from "@utils/messages/errorMessages";

// Define JWT token structure
interface JwtPayload {
  isAdmin?: boolean;
}

// Define AuthContext Type
interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  login: (token: string) => void;
  logout: () => void;
}

// Provide a default context value
export const AuthContext = createContext<AuthContextType>(undefined!);

// AuthProvider Component
export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Check localStorage for token on initial render
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
        setIsLoggedIn(true);
        setIsAdmin(decoded.isAdmin ?? false);
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
  const login = (token: string) => {
    localStorage.setItem("token", token);
    setIsLoggedIn(true);

    try {
      const decoded: JwtPayload = jwtDecode<JwtPayload>(token);
      setIsAdmin(decoded.isAdmin ?? false);
    } catch (error) {
      console.error("Failed to decode token:", error);
    }
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
