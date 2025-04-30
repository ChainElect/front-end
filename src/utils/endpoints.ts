export const BACKEND_BASE_URL =
  process.env.REACT_APP_BACKEND_BASE_URL || "http://localhost:5001";

export const BACKEND_AUTH_API_ENDPOINTS = {
  REGISTER: `${BACKEND_BASE_URL}/api/auth/register`,
  LOGIN: `${BACKEND_BASE_URL}/api/auth/login`,
};

export const BACKEND_DATA_API_ENDPOINTS = {
  PARTIES: `${BACKEND_BASE_URL}/api/party/parties`,
  PREPARE_VOTE: `${BACKEND_BASE_URL}/api/zkp/prepare-vote`,
  CAST_VOTE: `${BACKEND_BASE_URL}/api/zkp/cast-vote`,
  VOTE_STATUS: `${BACKEND_BASE_URL}/api/zkp/status`,
  OCR_UPLOAD_FRONT: `${BACKEND_BASE_URL}/api/ocr/upload/id/front`,
  OCR_UPLOAD_BACK: `${BACKEND_BASE_URL}/api/ocr/upload/id/back`,
  IR_UPLOAD_FACE: `${BACKEND_BASE_URL}/api/ir/upload/face`,
  ZKP_REGISTER: `${BACKEND_BASE_URL}/api/zkp/register`,
};