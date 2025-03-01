import React, { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useThemeColors } from "@hooks/useThemeColors";
import { ActionButton } from "@theme/src/components";
import { SecondaryButton } from "@theme/src/components/buttons/SecondaryButton";
import { useStep1IDUploadData } from "./useStep1UploadIDData";

interface Step1IDUploadProps {
  onComplete: (data: any) => void;
  onError: (error: string) => void;
}

export const Step1IDUpload = ({ onComplete, onError }: Step1IDUploadProps) => {
  const { primary, text, border, background } = useThemeColors();
  const [idSide, setIdSide] = useState<"front" | "back">("front");

  // Our custom hook for uploading
  const { frontUploaded, handleFrontDrop, handleBackDrop } =
    useStep1IDUploadData({ onComplete, onError });

  // Switch from front to back once front is done
  if (frontUploaded && idSide === "front") {
    setIdSide("back");
  }

  // Decide which function to call
  const onDrop = (acceptedFiles: File[]) => {
    if (idSide === "front") handleFrontDrop(acceptedFiles);
    else handleBackDrop(acceptedFiles);
  };

  // Setup dropzone
  const { getRootProps, getInputProps, isDragActive, open } = useDropzone({
    onDrop,
    accept: { "image/*": [".jpg", ".jpeg", ".png"] },
    maxFiles: 1,
    noClick: true, // We'll manually open the file dialog
  });

  return (
    <div className="space-y-6">
      {/* Header: same style as original */}
      <div className="flex items-center mb-2">
        <h3 className="ml-4 text-lg font-medium" style={{ color: text }}>
          {idSide === "front" ? "Upload Front of ID" : "Upload Back of ID"}
        </h3>
      </div>

      {/* Dashed border container with big icon */}
      <div
        className="p-8 rounded-xl border-2 border-dashed text-center transition-colors"
        style={{
          borderColor: isDragActive ? primary : border,
          backgroundColor: isDragActive ? `${primary}10` : background,
        }}
        {...getRootProps()}
      >
        <input {...getInputProps()} />
        <div className="space-y-4">
          {/* Big icon */}
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-16 w-16 mx-auto mb-4 opacity-60"
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
          <p className="text-lg" style={{ color: text }}>
            {isDragActive
              ? `Drop ${idSide} of ID here`
              : `Drag & drop ${idSide} of ID here, or click the button below`}
          </p>
          <ActionButton text={`Select ${idSide} of ID`} onClick={open} />
        </div>
      </div>
    </div>
  );
};
