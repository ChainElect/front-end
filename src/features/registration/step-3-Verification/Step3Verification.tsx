import React, { useState } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/src/components";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import axios from "axios";

export const Step3Verification = ({ data, onConfirm, onRetry }) => {
  const { primary, text, border } = useThemeColors();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Handle final registration
  const handleFinalRegistration = async () => {
    setIsSubmitting(true);
    setError(null);

    try {
      // Send verification data to server for ZKP registration
      const response = await axios.post("http://localhost:5001/api/registration/complete", {
        frontPath: data.frontPath,
        backPath: data.backPath,
        selfiePath: data.selfiePhotoPath
      });

      if (response.data.success) {
        // Pass ZKP credentials to parent component
        onConfirm(response.data.credentials);
      } else {
        setError(response.data.message || "Registration failed");
        setIsSubmitting(false);
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Server error");
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
          <VerifiedField
            label="Full Name"
            value={data.extractedData.fullName}
          />
          <VerifiedField
            label="ID Number"
            value={data.extractedData.idNumber}
          />
          <VerifiedField
            label="Date of Birth"
            value={data.extractedData.birthDate}
          />
        </div>
      </div>

      {error && (
        <div className="p-4 bg-red-100 border border-red-300 rounded-lg text-red-700">
          {error}
        </div>
      )}

      <div className="flex justify-center gap-4">
        <SecondaryButton
          text="Retake Photos"
          onClick={onRetry}
        />
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