import { BACKEND_BASE_URL } from "@utils/endpoints";
import { BACKEND_DATA_API_ENDPOINTS } from "@utils/endpoints";
import axios from "axios";

export const useStep3VerificationData = (
  registrationData: any,
  onConfirm: () => void,
  onRetry: () => void
) => {
  const handleFinalRegistration = async () => {
    const { extractedData } = registrationData;
    if (!extractedData) {
      onRetry();
      return;
    }

    try {
      const response = await axios.post(
        BACKEND_DATA_API_ENDPOINTS.ZKP_REGISTER,
        {
          userData: {
            commitment_hash : extractedData.idNumber,        
            password : extractedData.birthDate,
            is_admin: extractedData.isAdmin || false,
          }
        }
      );

      if (response.data.success) {
        if (response.data.credentials) {
          localStorage.setItem(
            "zkp_credentials",
            JSON.stringify(response.data.credentials)
          );
        }
       
        const registerPayload = {
          commitment_hash: extractedData.idNumber,
          password: extractedData.birthDate, 
          is_admin: extractedData.isAdmin || false,        
        };
        debugger;
        console.log("Register Payload", registerPayload);
        const registerResponse = await fetch(
          `${BACKEND_BASE_URL}/api/auth/register`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            credentials: "include",
            body: JSON.stringify(registerPayload),
          }
        );
        const registerResult = await registerResponse.json();

        if (registerResult.success) {
          onConfirm();
        } else {
          onRetry();
        }
      } else {
        onRetry();
      }
    } catch (err) {
      onRetry();
      throw err; // Re-throw to handle in component
    }
  };

  return { handleFinalRegistration };
};