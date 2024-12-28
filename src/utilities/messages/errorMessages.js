// Error Messages with Codes
export const ERROR_MESSAGES = {
  REGISTRATION_FAILED: {
    code: "REG001",
    message: "Възникна грешка при регистрацията. Моля, опитайте отново.",
  },
  NETWORK_ERROR: {
    code: "NET001",
    message: "Network error. Please check your connection.",
  },
  UNAUTHORIZED: {
    code: "AUTH001",
    message: "You are not authorized to access this resource.",
  },
  SERVER_ERROR: {
    code: "SRV001",
    message: "An error occurred on the server. Please try again later.",
  },
  LOGIN_FAILED: {
    code: "AUTH002",
    message: "Невалиден номер на лична карта или парола.",
  },
  MISSING_FIELDS: {
    code: "FORM001",
    message: "Моля, попълнете всички задължителни полета.",
  },
  PASSWORDS_NOT_MATCHING: {
    code: "FORM002",
    message: "Паролите не съвпадат.",
  },
  FAILED_JTW_DECODING: {
    code: "JWT001",
    message: "Failed to decode token.",
  },
  FETCH_PARTIES_FAILED: {
    code: "DATA001",
    message: "Error fetching parties. Please try again later.",
  },
  ADDING_PARTY_FAILED: {
    code: "DATA002",
    message: "Възникна грешка при добавянето на партията.",
  },
  ADDING_ELECTION_FAILED: {
    code: "DATA003",
    message: "Възникна грешка при създаването на изборите.",
  },
  WALLET_NOT_CONNECTED: {
    code: "WALLET001",
    message: "Моля, свържете портфейла си!",
  },
};
