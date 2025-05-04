import React, { useEffect, useState } from "react";
import axios from "axios";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/src/components";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { useStep3VerificationData } from "./useStep3VerificationData";

interface Step3VerificationProps {
  data: {
    selfiePhotoPath: string;
    frontPath: string;
    extractedData: {
      fullName: string;
      idNumber: string;
      birthDate: string;
    };
  };
  onConfirm: () => void;
  onRetry: () => void;
}

export const Step3Verification: React.FC<Step3VerificationProps> = ({ data, onConfirm, onRetry }) => {
  const { primary, text, border } = useThemeColors();
  const [faceMatched, setFaceMatched] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { handleFinalRegistration } = useStep3VerificationData(data, onConfirm, onRetry);

  useEffect(() => {
    const verifyFaceMatch = async () => {
      if (!data.selfiePhotoPath || !data.frontPath) {
        onRetry();
        return;
      }

      try {
        const response = await axios.post("http://localhost:5001/api/ir/match/face", {
          selfieFacePath: data.selfiePhotoPath,
          idCardFacePath: data.frontPath,
        });
        setFaceMatched(response.data.success);
      } catch (error) {
        setFaceMatched(false);
        setError("Face verification failed. Please try again.");
      }
    };

    verifyFaceMatch();
  }, [data, onRetry]);

  if (faceMatched === null) {
    return (
      <div className="flex justify-center p-8">
        <p style={{ color: text }}>Verifying face match...</p>
      </div>
    );
  }

  if (faceMatched === false) {
    return (
      <div className="space-y-4 text-center">
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
          Face verification failed. The person in the selfie doesn't match the ID photo.
        </div>
        <SecondaryButton text="Try Again" onClick={onRetry} />
      </div>
    );
  }

  const handleSubmit = async () => {
    setIsSubmitting(true);
    setError(null);
    
    try {
      await handleFinalRegistration();
    } catch (err: any) {
      console.error("Registration error:", err);
      setError(err.response?.data?.message || "Server error. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-8">
      <div className="p-6 rounded-xl border" style={{ borderColor: border }}>
        <h3 className="text-xl font-bold mb-4" style={{ color: primary }}>
          Verify Your Information
        </h3>
        <div className="space-y-3">
          <VerifiedField label="Full Name" value={data.extractedData.fullName} />
          <VerifiedField label="ID Number" value={data.extractedData.idNumber} />
          <VerifiedField label="Date of Birth" value={data.extractedData.birthDate} />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-4">
        <SecondaryButton text="Retake Photos" onClick={onRetry} />
        <ActionButton
          text={isSubmitting ? "Processing..." : "Confirm & Register"}
          onClick={handleSubmit}
        />
      </div>
    </div>
  );
};

const VerifiedField = ({ label, value }: { label: string; value: string }) => {
  const { text } = useThemeColors();
  return (
    <div className="flex justify-between items-center py-2 border-b">
      <span className="font-medium" style={{ color: text }}>
        {label}:
      </span>
      <span className="opacity-90" style={{ color: text }}>
        {value}
      </span>
    </div>
  );
};