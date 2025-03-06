import { useRef, useState } from "react";
import Webcam from "react-webcam";

interface UseStep1IDCaptureDataProps {
  onComplete: (data: any) => void;
  onError: (error: string) => void;
}

export const useStep1IDCaptureData = ({
  onComplete,
  onError,
}: UseStep1IDCaptureDataProps) => {
  const webcamRef = useRef<Webcam>(null);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [frontCaptured, setFrontCaptured] = useState(false);

  const capture = () => {
    const imageSrc = webcamRef.current?.getScreenshot();
    if (!imageSrc) {
      onError("Failed to capture image");
      return;
    }
    setCapturedImage(imageSrc);
  };

  // Convert a data URL to a File object
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

  const confirmCapture = async () => {
    if (!capturedImage) {
      onError("No image captured");
      return;
    }
    // Decide if it's front or back
    const fileName = frontCaptured ? "id_back.jpg" : "id_front.jpg";
    const endpoint = frontCaptured
      ? `${process.env.REACT_APP_BACKEND_BASE_URL}/api/ocr/upload/id/back`
      : `${process.env.REACT_APP_BACKEND_BASE_URL}/api/ocr/upload/id/front`;

    try {
      const file = dataURLtoFile(capturedImage, fileName);
      const formdata = new FormData();
      formdata.append(frontCaptured ? "backImage" : "frontImage", file);

      const res = await fetch(endpoint, { method: "POST", body: formdata });
      const result = await res.json();
      if (result.success) {
        if (!frontCaptured) {
          setFrontCaptured(true);
          setCapturedImage(null);
        } else {
          onComplete(result.data);
        }
      } else {
        onError(result.message || "ID upload failed");
      }
    } catch (err) {
      onError("ID upload failed");
    }
  };

  const resetCapture = () => {
    setCapturedImage(null);
  };

  return {
    webcamRef,
    capturedImage,
    frontCaptured,
    capture,
    confirmCapture,
    resetCapture,
  };
};