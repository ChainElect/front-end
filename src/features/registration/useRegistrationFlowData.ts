import { useState } from "react";
import { RegistrationData, RegistrationStep } from "types/registration";
import { useNavigate } from "react-router-dom";

export const useRegistrationFlowData = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>("ID_UPLOAD");
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    frontPath: null,
    backPath: null,
    extractedData: {
      fullName: "",
      idNumber: "",
      birthDate: "",
    },
    selfiePhotoPath: null,
    verificationStatus: "unverified",
  });

  const handleStepComplete = (stepData: Partial<RegistrationData>) => {
    setRegistrationData((prev) => ({ ...prev, ...stepData }));
    const nextStep: Record<RegistrationStep, RegistrationStep> = {
      ID_UPLOAD: "SELFIE_CAPTURE",
      SELFIE_CAPTURE: "VERIFICATION",
      VERIFICATION: "VERIFICATION", // Final step remains the same
    };
    setCurrentStep(nextStep[currentStep]);
  };

  const handleErrorRetry = () => {
    setCurrentStep("ID_UPLOAD");
    setRegistrationData({
      frontPath: null,
      backPath: null,
      extractedData: {
        fullName: "",
        idNumber: "",
        birthDate: "",
      },
      selfiePhotoPath: null,
      verificationStatus: "unverified",
    });
  };

  const handleFinalComplete = () => {
    // Reset registration flow and potentially navigate to a success page
    handleErrorRetry();
    navigate('/login'); // or any other appropriate route
  };

  return {
    currentStep,
    registrationData,
    handleStepComplete,
    handleErrorRetry,
    handleFinalComplete,
  };
};