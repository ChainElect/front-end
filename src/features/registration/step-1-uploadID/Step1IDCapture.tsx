import React, { useState } from "react";
import Webcam from "react-webcam";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/src/components";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { useStep1IDCaptureData } from "./useStep1CaptureIDData";

interface Step1IDCaptureProps {
  onComplete: (data: any) => void;
  onError: (error: string) => void;
}

export const Step1IDCapture = ({
  onComplete,
  onError,
}: Step1IDCaptureProps) => {
  const { primary, text } = useThemeColors();
  const [idSide, setIdSide] = useState<"front" | "back">("front");

  // Our custom hook for capturing
  const {
    webcamRef,
    capturedImage,
    frontCaptured,
    capture,
    confirmCapture,
    resetCapture,
  } = useStep1IDCaptureData({ onComplete, onError });

  // Switch to "back" side once front is captured
  if (frontCaptured && idSide === "front") {
    setIdSide("back");
  }

  return (
    <div className="space-y-6">
      {/* Header: same style as original */}
      <div className="flex items-center mb-2">
        <h3 className="ml-4 text-lg font-medium" style={{ color: text }}>
          {idSide === "front" ? "Capture Front of ID" : "Capture Back of ID"}
        </h3>
      </div>

      {!capturedImage ? (
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 border-4"
            style={{ borderColor: primary }}
          />

          <div className="absolute inset-0 flex items-center justify-center">
            <div
              className="text-center p-4 rounded-lg max-w-xs"
              style={{ backgroundColor: "rgba(0,0,0,0.5)", color: "white" }}
            >
              <p>Position the {idSide} of your ID card within the frame</p>
            </div>
          </div>
        </div>
      ) : (
        <img
          src={capturedImage}
          alt={`Captured ${idSide} of ID`}
          className="rounded-xl border-4"
          style={{ borderColor: primary }}
        />
      )}

      <div className="flex justify-center gap-4">
        {!capturedImage ? (
          <ActionButton text={`Capture ${idSide} of ID`} onClick={capture} />
        ) : (
          <>
            <SecondaryButton text="Retake" onClick={resetCapture} />
            <ActionButton text="Confirm" onClick={confirmCapture} />
          </>
        )}
      </div>
    </div>
  );
};
