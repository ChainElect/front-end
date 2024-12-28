import axios from "axios";

import { BACKEND_AUTH_API_ENDPOINTS } from "../utilities/endpoints";

export const AuthService = {
  // Register User
  registerUser: async (userData) => {
    return await axios.post(BACKEND_AUTH_API_ENDPOINTS.REGISTER, userData);
  },

  // Login User
  loginUser: async (loginData) => {
    return await axios.post(BACKEND_AUTH_API_ENDPOINTS.LOGIN, loginData);
  },
};
