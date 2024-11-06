import axios from "axios";

// Base URL for your backend API
const API_URL = "http://localhost:5001"; // Adjust if your backend runs on a different URL or port

// Register User
export const registerUser = async (userData) => {
  return await axios.post(`${API_URL}/register`, userData);
};

// Login User
export const loginUser = async (loginData) => {
  return await axios.post(`${API_URL}/login`, loginData);
};
