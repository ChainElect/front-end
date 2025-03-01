import React from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { Title, Paragraph } from "@theme/src/foundation/typography";
import { Step2CaptureSelfie } from "./step-2-CaptureSelfie/Step2CaptureSelfie";
import { Step3Verification } from "./step-3-Verification/Step3Verification";
import { useRegistrationFlowData } from "./useRegistrationFlowData";
import { Step1IDCard } from "./step-1-uploadID/Step1IDCard";

export const RegistrationFlow = () => {
  const { primary, background } = useThemeColors();
  const {
    currentStep,
    registrationData,
    handleStepComplete,
    handleErrorRetry,
  } = useRegistrationFlowData();

  return (
    <div className="min-h-screen py-12" style={{ backgroundColor: background }}>
      <header
        className="py-16 backdrop-blur-lg border-b text-center"
        style={{
          backgroundColor: `color-mix(in srgb, ${background} 85%, transparent)`,
          borderColor: `color-mix(in srgb, ${primary} 30%, transparent)`,
        }}
      >
        <Title variant="gradient" className="text-4xl font-bold">
          Identity Verification
        </Title>
        <Paragraph className="mt-4 text-lg opacity-90">
          {currentStep === "ID_UPLOAD" && "Upload your government-issued ID"}
          {currentStep === "SELFIE_CAPTURE" && "Take a live selfie"}
          {currentStep === "VERIFICATION" && "Verify your information"}
        </Paragraph>
      </header>

      <main className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {currentStep === "ID_UPLOAD" && (
            <Step1IDCard
              onComplete={handleStepComplete}
              onError={handleErrorRetry}
            />
          )}

          {currentStep === "SELFIE_CAPTURE" && (
            <Step2CaptureSelfie
              onComplete={handleStepComplete}
              onError={handleErrorRetry}
            />
          )}

          {currentStep === "VERIFICATION" && (
            <Step3Verification
              data={registrationData}
              onConfirm={() => {
                // Handle final confirmation (e.g. calling backend endpoints)
              }}
              onRetry={handleErrorRetry}
            />
          )}
        </div>
      </main>
    </div>
  );
};
