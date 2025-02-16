export const BACKEND_BASE_URL =
  process.env.BACKEND_BASE_URL || "http://localhost:5001";

export const BACKEND_AUTH_API_ENDPOINTS = {
  REGISTER: `${BACKEND_BASE_URL}/register`,
  LOGIN: `${BACKEND_BASE_URL}/login`,
};

export const BACKEND_DATA_API_ENDPOINTS = {
  PARTIES: `${BACKEND_BASE_URL}/parties`,
};
