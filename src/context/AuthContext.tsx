import React, { createContext, useState, useEffect, FC } from "react";
import { jwtDecode } from "jwt-decode";
import * as Sentry from "@sentry/react";

import { ERROR_MESSAGES } from "@utils/messages/errorMessages";

/**
 * @interface JwtPayload
 * @description Defines the expected structure of the decoded JWT token.
 */
interface JwtPayload {
  isAdmin?: boolean;
}

/**
 * @interface AuthContextType
 * @description Represents the structure of the authentication context.
 */
interface AuthContextType {
  isLoggedIn: boolean;
  isAdmin: boolean;
  /**
   * @function login
   * @param token - JWT token as a string.
   */
  login: (token: string) => void;
  /**
   * @function logout
   */
  logout: () => void;
}

/**
 * @constant AuthContext
 * @description Creates the authentication context with a default value.
 */
export const AuthContext = createContext<AuthContextType>(undefined!);

/**
 * @summary Decodes a JWT token.
 * @description Attempts to decode the provided JWT token. If decoding fails,
 * the error is captured using Sentry with additional error details from ERROR_MESSAGES.
 * @param token {string} - The JWT token to decode.
 * @returns {JwtPayload | null} - The decoded payload, or null if decoding fails.
 */
const decodeToken = (token: string): JwtPayload | null => {
  try {
    return jwtDecode<JwtPayload>(token);
  } catch (error: unknown) {
    Sentry.captureException(error, {
      extra: {
        errorCode: ERROR_MESSAGES.FAILED_JTW_DECODING.code,
        errorMessage: ERROR_MESSAGES.FAILED_JTW_DECODING.message,
      },
    });
    return null;
  }
};

/**
 * @component AuthProvider
 * @description Provides authentication state and actions (login, logout) to its children.
 * It checks for an existing token on mount and decodes it to set initial state.
 *
 * @param children {React.ReactNode} - The child elements that require access to authentication context.
 */
export const AuthProvider: FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // On initial render, check localStorage for a token and decode it.
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = decodeToken(token);
      if (decoded) {
        setIsLoggedIn(true);
        setIsAdmin(decoded.isAdmin ?? false);
      } else {
        // Clear state if decoding fails
        setIsLoggedIn(false);
        setIsAdmin(false);
      }
    }
  }, []);

  /**
   * @function login
   * @description Stores the token, decodes it, and updates authentication state.
   * If decoding fails, the error is logged and the state is reset.
   * @param token {string} - The JWT token for logging in.
   */
  const login = (token: string) => {
    localStorage.setItem("token", token);
    const decoded = decodeToken(token);
    if (decoded) {
      setIsLoggedIn(true);
      setIsAdmin(decoded.isAdmin ?? false);
    } else {
      // If decoding fails during login, ensure the token is removed
      localStorage.removeItem("token");
      setIsLoggedIn(false);
      setIsAdmin(false);
    }
  };

  /**
   * @function logout
   * @description Removes the token from localStorage and resets the authentication state.
   */
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
