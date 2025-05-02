import React, { useEffect, useState } from "react";
import axios from "axios";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/src/components";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { BACKEND_DATA_API_ENDPOINTS } from "@utils/endpoints";

export const Step3Verification = ({ data, onConfirm, onRetry }) => {
  const { primary, text, border } = useThemeColors();
  const [faceMatched, setFaceMatched] = useState<boolean | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Run face match on mount
  useEffect(() => {
    const verifyFaceMatch = async () => {
      const { selfiePhotoPath, frontPath } = data;
      if (!selfiePhotoPath || !frontPath) {
        onRetry();
        return;
      }
      try {
        const response = await axios.post("http://localhost:5001/api/ir/match/face", {
          selfieFacePath: selfiePhotoPath,
          idCardFacePath: frontPath,
        });

        setFaceMatched(response.data.success);
      } catch {
        setFaceMatched(false);
      }
    };

    verifyFaceMatch();
  }, [data, onRetry]);

  // Handle final registration
  const handleFinalRegistration = async () => {
    setIsSubmitting(true);
    setError(null);
  
    try {
      const response = await axios.post(
        BACKEND_DATA_API_ENDPOINTS.ZKP_REGISTER, 
        {
          frontPath: data.frontPath,
          backPath: data.backPath,
          selfiePath: data.selfiePhotoPath,
        }
      );
  
      if (response.data.success) {
        // Store the credentials in localStorage for future use
        if (response.data.credentials) {
          localStorage.setItem(
            "zkp_credentials", 
            JSON.stringify(response.data.credentials)
          );
        }
        onConfirm(response.data.credentials);
      } else {
        setError(response.data.message || "Registration failed");
      }
    } catch (err) {
      console.error("Registration error:", err);
      setError(
        err.response?.data?.message || 
        "Server error. Please try again later."
      );
    } finally {
      setIsSubmitting(false);
    }
  };
  // UI: waiting for face match
  if (faceMatched === null) {
    return <p style={{ color: text }}>Verifying face match...</p>;
  }

  // UI: face match failed
  if (faceMatched === false) {
    return (
      <div className="space-y-8">
        <p style={{ color: text }}>
          Face verification failed. The person on the ID does not match the selfie.
        </p>
        <SecondaryButton text="Retake Photos" onClick={onRetry} />
      </div>
    );
  }

  // UI: face matched and ready to register
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
          onClick={handleFinalRegistration}
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
