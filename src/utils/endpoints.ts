export const BACKEND_BASE_URL =
  process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:5001";

export const BACKEND_AUTH_API_ENDPOINTS = {
  REGISTER: `${BACKEND_BASE_URL}/register`,
  LOGIN: `${BACKEND_BASE_URL}/api/auth/login`,
};

export const BACKEND_DATA_API_ENDPOINTS = {
  PARTIES: `${BACKEND_BASE_URL}/parties`,
};
