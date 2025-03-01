import { useState } from "react";
import { RegistrationData, RegistrationStep } from "types/registration";

export const useRegistrationFlowData = () => {
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

  return {
    currentStep,
    registrationData,
    handleStepComplete,
    handleErrorRetry,
  };
};