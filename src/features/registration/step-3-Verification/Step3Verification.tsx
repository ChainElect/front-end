// Step3Verification.tsx
import React, { useEffect, useState } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/src/components";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { useStep3VerificationData } from "./useStep3VerificationData";

export const Step3Verification = ({ data, onConfirm, onRetry }) => {
  const { primary, text, border } = useThemeColors();
  const [faceMatched, setFaceMatched] = useState<boolean | null>(null);
  const { handleFinalRegistration } = useStep3VerificationData(
    data,
    onConfirm,
    onRetry
  );

  // 1. Face Match on Mount
  useEffect(() => {
    const verifyFaceMatch = async () => {
      const { selfiePhotoPath, frontPath } = data;
      if (!selfiePhotoPath || !frontPath) {
        // If either path is missing, go back to retake
        onRetry();
        return;
      }
      try {
        const matchResponse = await fetch(
          "http://localhost:5001/api/ir/match/face",
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              selfieFacePath: selfiePhotoPath,
              idCardFacePath: frontPath,
            }),
          }
        );
        const matchResult = await matchResponse.json();
        if (matchResult.success) {
          setFaceMatched(true);
        } else {
          setFaceMatched(false);
        }
      } catch (err) {
        setFaceMatched(false);
      }
    };

    verifyFaceMatch();
  }, [data, onRetry]);

  // 2. While matching, show a "verifying" message
  if (faceMatched === null) {
    return <p style={{ color: text }}>Verifying face match...</p>;
  }

  // 3. If match fails, show error & retake
  if (faceMatched === false) {
    return (
      <div className="space-y-8">
        <p style={{ color: text }}>
          Face verification failed. The person on the ID does not match the
          selfie.
        </p>
        <SecondaryButton text="Retake Photos" onClick={onRetry} />
      </div>
    );
  }

  // 4. If match passes, show the extracted data
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

      <div className="flex justify-center gap-4">
        <SecondaryButton text="Retake Photos" onClick={onRetry} />
        <ActionButton
          text="Confirm & Register"
          onClick={() => handleFinalRegistration()}
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
