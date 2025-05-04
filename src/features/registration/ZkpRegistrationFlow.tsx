import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useThemeColors } from "@hooks/useThemeColors";
import { Title, Paragraph } from "@theme/src/foundation/typography";
import { ActionButton } from "@theme/src/components/buttons/ActionButton";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { Step1IDCard } from "./step-1-uploadID/Step1IDCard";
import { Step2CaptureSelfie } from "./step-2-CaptureSelfie/Step2CaptureSelfie";
import { Step3Verification } from "./step-3-Verification/Step3Verification";
import { Step4ZkpCredential } from "./step-4-ZkpCredentials/Step4ZkpCredentail";
import axios from "axios";

type RegistrationStep = 'ID_UPLOAD' | 'SELFIE_CAPTURE' | 'VERIFICATION' | 'ZKP_CREDENTIAL';

interface RegistrationData {
  frontPath: string | null;
  backPath: string | null;
  extractedData?: {
    fullName: string;
    idNumber: string;
    birthDate: string;
  };
  selfiePhotoPath: string | null;
  credentials?: {
    nullifier: string;
    secret: string;
  };
}

export const ZkpRegistrationFlow: React.FC = () => {
  const { primary, background, text } = useThemeColors();
  const [currentStep, setCurrentStep] = useState<RegistrationStep>('ID_UPLOAD');
  const [registrationData, setRegistrationData] = useState<RegistrationData>({
    frontPath: null,
    backPath: null,
    selfiePhotoPath: null
  });
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleStepComplete = (stepData: Partial<RegistrationData>) => {
    setRegistrationData(prev => ({ ...prev, ...stepData }));
    switch (currentStep) {
      case 'ID_UPLOAD':
        setCurrentStep('SELFIE_CAPTURE');
        break;
      case 'SELFIE_CAPTURE':
        setCurrentStep('VERIFICATION');
        break;
      case 'VERIFICATION':
        setCurrentStep('ZKP_CREDENTIAL');
        break;
      case 'ZKP_CREDENTIAL':
        navigate("/");
        break;
    }
  };

  const handleErrorRetry = () => {
    setError(null);
    setCurrentStep('ID_UPLOAD');
    setRegistrationData({
      frontPath: null,
      backPath: null,
      selfiePhotoPath: null
    });
  };

  const generateZkpCredentials = async () => {
    setLoading(true);
    setError(null);
    try {
      const { frontPath, backPath, selfiePhotoPath } = registrationData;
      if (!frontPath || !backPath || !selfiePhotoPath) {
        throw new Error("Missing required data for ZKP generation");
      }
      const response = await axios.post("/api/zkp/register", {
        frontPath,
        backPath,
        selfiePath: selfiePhotoPath
      });
      if (response.data.success) {
        setRegistrationData(prev => ({
          ...prev,
          credentials: response.data.credentials
        }));
        localStorage.setItem("zkp_credentials", JSON.stringify(response.data.credentials));
        setCurrentStep('ZKP_CREDENTIAL');
      } else {
        throw new Error(response.data.message || "Failed to generate ZKP credentials");
      }
    } catch (err: any) {
      console.error("Error generating ZKP credentials:", err);
      setError(
        err.response?.data?.message ||
        "Failed to generate ZKP credentials. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

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
          Secure Registration with Zero-Knowledge Proofs
        </Title>
        <Paragraph className="mt-4 text-lg opacity-90" style={{ color: text }}>
          {currentStep === 'ID_UPLOAD' && "Step 1: Upload your government-issued ID"}
          {currentStep === 'SELFIE_CAPTURE' && "Step 2: Take a live selfie"}
          {currentStep === 'VERIFICATION' && "Step 3: Verify your information"}
          {currentStep === 'ZKP_CREDENTIAL' && "Step 4: Save your anonymous voting credentials"}
        </Paragraph>
      </header>

      <main className="py-12">
        <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Progress bar */}
          <div className="mb-8">
            <div className="h-2 w-full bg-gray-200 dark:bg-gray-700 rounded-full">
              <div
                className="h-2 rounded-full transition-all duration-500"
                style={{
                  width:
                    currentStep === 'ID_UPLOAD' ? '25%' :
                    currentStep === 'SELFIE_CAPTURE' ? '50%' :
                    currentStep === 'VERIFICATION' ? '75%' : '100%',
                  backgroundColor: primary
                }}
              />
            </div>
            <div className="flex justify-between mt-2">
              <span className={`text-sm ${currentStep === 'ID_UPLOAD' ? 'font-bold' : ''}`} style={{ color: text }}>Upload ID</span>
              <span className={`text-sm ${currentStep === 'SELFIE_CAPTURE' ? 'font-bold' : ''}`} style={{ color: text }}>Selfie</span>
              <span className={`text-sm ${currentStep === 'VERIFICATION' ? 'font-bold' : ''}`} style={{ color: text }}>Verify</span>
              <span className={`text-sm ${currentStep === 'ZKP_CREDENTIAL' ? 'font-bold' : ''}`} style={{ color: text }}>Credentials</span>
            </div>
          </div>

          {error && (
            <div className="bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-200 p-4 rounded-lg mb-6">
              <Paragraph>{error}</Paragraph>
              <div className="mt-4 flex justify-end">
                <SecondaryButton text="Try Again" onClick={handleErrorRetry} />
              </div>
            </div>
          )}

          {currentStep === 'ID_UPLOAD' && (
            <Step1IDCard
              onComplete={handleStepComplete}
              onError={setError}
            />
          )}

          {currentStep === 'SELFIE_CAPTURE' && (
            <Step2CaptureSelfie
              onComplete={handleStepComplete}
              onError={setError}
            />
          )}

          {currentStep === 'VERIFICATION' &&
            registrationData.frontPath &&
            registrationData.selfiePhotoPath &&
            registrationData.extractedData && (
              <>
                <Step3Verification
                  data={{
                    frontPath: registrationData.frontPath,
                    selfiePhotoPath: registrationData.selfiePhotoPath,
                    extractedData: registrationData.extractedData
                  }}
                  onConfirm={generateZkpCredentials}
                  onRetry={handleErrorRetry}
                />
                {loading && (
                  <div className="text-center mt-6">
                    <Paragraph>Generating secure voting credentials...</Paragraph>
                  </div>
                )}
              </>
            )
          }

          {currentStep === 'ZKP_CREDENTIAL' && registrationData.credentials && (
            <Step4ZkpCredential
              credentials={registrationData.credentials}
              userData={registrationData.extractedData}
              onComplete={() => navigate("/")}
            />
          )}
        </div>
      </main>
    </div>
  );
};
