import { useState, useRef } from "react";
import Webcam from "react-webcam";

export const useStep2CaptureSelfieData = (
  onComplete: (data: { selfiePhotoPath: string }) => void,
  onError: (error: string) => void
) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      onError("Failed to capture image");
      return;
    }
    setCapturedImage(imageSrc);
  };

  // Helper function to convert a data URL to a File object
  const dataURLtoFile = (dataurl: string, filename: string) => {
    const arr = dataurl.split(",");
    const mimeMatch = arr[0].match(/:(.*?);/);
    if (!mimeMatch) throw new Error("Invalid data URL");
    const mime = mimeMatch[1];
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
    while (n--) u8arr[n] = bstr.charCodeAt(n);
    return new File([u8arr], filename, { type: mime });
  };

  const handleConfirm = async () => {
    if (!capturedImage) {
      onError("No image captured");
      return;
    }
    const file = dataURLtoFile(capturedImage, "selfie.jpg");
    const formdata = new FormData();
    formdata.append("faceImage", file);
    try {
      const response = await fetch("http://localhost:5001/api/ir/upload/face", {
        method: "POST",
        body: formdata,
      });
      const result = await response.json();
      if (result.success) {
        onComplete({ selfiePhotoPath: result.filePath });
      } else {
        onError(result.message || "Selfie upload failed");
      }
    } catch (error) {
      onError("Selfie upload failed");
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
  };

  return { webcamRef, capturedImage, capture, handleConfirm, resetCapture };
};