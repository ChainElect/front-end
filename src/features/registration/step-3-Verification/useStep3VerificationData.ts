import { BACKEND_BASE_URL } from "@utils/endpoints";

// useStep3VerificationData.ts
export const useStep3VerificationData = (
  registrationData: any,
  onConfirm: () => void,
  onRetry: () => void
) => {
  // Called when user clicks "Confirm & Register" after face match is successful
  const handleFinalRegistration = async () => {
    const { extractedData } = registrationData;
    if (!extractedData) {
      onRetry();
      return;
    }

    // Hard-coded email & password for now
    const registerPayload = {
      fullName: extractedData.fullName,
      email: "borislav123@gmail.com",
      password: "password",
      idNumber: extractedData.idNumber,
    };

    try {
      const registerResponse = await fetch(
        `${BACKEND_BASE_URL}/api/auth/register`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(registerPayload),
        }
      );
      const registerResult = await registerResponse.json();

      if (registerResult.success) {
        onConfirm();
      } else {
        onRetry();
      }
    } catch (err) {
      onRetry();
    }
  };

  return { handleFinalRegistration };
};
