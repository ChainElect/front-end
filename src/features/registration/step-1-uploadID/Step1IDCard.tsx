import React, { useState } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { Step1IDUpload } from "./Step1IDUpload";
import { Step1IDCapture } from "./Step1IDCapture";

interface Step1IDCardProps {
  onComplete: (data: any) => void;
  onError: (error: string) => void;
}

export const Step1IDCard = ({ onComplete, onError }: Step1IDCardProps) => {
  const { primary, text, border, background } = useThemeColors();
  const [method, setMethod] = useState<"upload" | "capture" | null>(null);

  // 1. Method selection screen
  if (!method) {
    return (
      <div className="space-y-8">
        <div
          className="p-8 rounded-xl border-2 border-dashed text-center"
          style={{ borderColor: border }}
        >
          <h2 className="text-xl font-semibold mb-6" style={{ color: text }}>
            How would you like to provide your ID?
          </h2>
          <div className="grid grid-cols-2 gap-6">
            {/* Upload Option */}
            <div
              className="p-6 rounded-lg cursor-pointer transition-all"
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: border,
                backgroundColor: background,
              }}
              onClick={() => setMethod("upload")}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = primary;
                e.currentTarget.style.backgroundColor = `${primary}10`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.backgroundColor = background;
              }}
            >
              <div className="flex flex-col items-center">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={text}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
                  />
                </svg>
                <span className="font-medium" style={{ color: text }}>
                  Upload from device
                </span>
                <p className="text-sm mt-2" style={{ color: `${text}80` }}>
                  Use existing photos from your device
                </p>
              </div>
            </div>

            {/* Capture Option */}
            <div
              className="p-6 rounded-lg cursor-pointer transition-all"
              style={{
                borderWidth: "1px",
                borderStyle: "solid",
                borderColor: border,
                backgroundColor: background,
              }}
              onClick={() => setMethod("capture")}
              onMouseOver={(e) => {
                e.currentTarget.style.borderColor = primary;
                e.currentTarget.style.backgroundColor = `${primary}10`;
              }}
              onMouseOut={(e) => {
                e.currentTarget.style.borderColor = border;
                e.currentTarget.style.backgroundColor = background;
              }}
            >
              <div className="flex flex-col items-center">
                {/* Icon */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-12 w-12 mb-4"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke={text}
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z"
                  />
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M15 13a3 3 0 11-6 0 3 3 0 016 0z"
                  />
                </svg>
                <span className="font-medium" style={{ color: text }}>
                  Take a photo now
                </span>
                <p className="text-sm mt-2" style={{ color: `${text}80` }}>
                  Use your webcam to take a photo
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // 2. Upload ID flow
  if (method === "upload") {
    return (
      <div className="space-y-6">
        <div className="flex items-center mb-2">
          <SecondaryButton text="← Back" onClick={() => setMethod(null)} />
        </div>
        {/* Render the Upload component */}
        <Step1IDUpload onComplete={onComplete} onError={onError} />
      </div>
    );
  }

  // 3. Capture ID flow
  return (
    <div className="space-y-6">
      <div className="flex items-center mb-2">
        <SecondaryButton text="← Back" onClick={() => setMethod(null)} />
      </div>
      {/* Render the Capture component */}
      <Step1IDCapture onComplete={onComplete} onError={onError} />
    </div>
  );
};
