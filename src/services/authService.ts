import axios from "axios";

import { BACKEND_AUTH_API_ENDPOINTS } from "@utils/endpoints";

export const AuthService = {
  // Register User
  registerUser: async (userData : any) => {
    return await axios.post(BACKEND_AUTH_API_ENDPOINTS.REGISTER, userData);
  },

  // Login User
  loginUser: async (loginData : any) => {
    return await axios.post(BACKEND_AUTH_API_ENDPOINTS.LOGIN, loginData);
  },
};
