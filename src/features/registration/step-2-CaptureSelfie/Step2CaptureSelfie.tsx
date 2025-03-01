// src/features/registration/Step2CaptureSelfie.tsx
import React from "react";
import Webcam from "react-webcam";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/src/components";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { useStep2CaptureSelfieData } from "./useStep2CaptureSelfieData";

export const Step2CaptureSelfie = ({ onComplete, onError }) => {
  const { primary, text } = useThemeColors();
  const { webcamRef, capturedImage, capture, handleConfirm, resetCapture } =
    useStep2CaptureSelfieData(onComplete, onError);

  return (
    <div className="space-y-8">
      {!capturedImage ? (
        <div className="relative aspect-video rounded-xl overflow-hidden">
          <Webcam
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            mirrored
            className="w-full h-full object-cover"
          />
          <div
            className="absolute inset-0 border-4"
            style={{ borderColor: primary }}
          />
        </div>
      ) : (
        <img
          src={capturedImage}
          alt="Captured selfie"
          className="rounded-xl border-4"
          style={{ borderColor: primary }}
        />
      )}

      <div className="flex justify-center gap-4">
        {!capturedImage ? (
          <ActionButton text="Take Photo" onClick={capture} />
        ) : (
          <>
            <SecondaryButton text="Retake" onClick={resetCapture} />
            <ActionButton text="Confirm" onClick={handleConfirm} />
          </>
        )}
      </div>
    </div>
  );
};
