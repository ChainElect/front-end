import { useState } from "react";
import { BACKEND_DATA_API_ENDPOINTS } from "@utils/endpoints";

interface UseStep1IDUploadDataProps {
  onComplete: (data: any) => void;
  onError: (error: string) => void;
}

export const useStep1IDUploadData = ({
  onComplete,
  onError,
}: UseStep1IDUploadDataProps) => {
  const [frontUploaded, setFrontUploaded] = useState(false);
  const [frontPath, setFrontPath] = useState<string | null>(null);

  const handleFrontDrop = async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      if (!file || !file.type.startsWith("image/")) {
        onError("Invalid file type for front");
        return;
      }
      const formdata = new FormData();
      formdata.append("frontImage", file);

      const res = await fetch(BACKEND_DATA_API_ENDPOINTS.OCR_UPLOAD_FRONT, {
        method: "POST",
        body: formdata,
      });
      const result = await res.json();
      if (result.success) {
        setFrontPath(result.frontPath);
        setFrontUploaded(true);
      } else {
        onError(result.message || "Front upload failed");
      }
    } catch (err) {
      onError("Front upload failed");
    }
  };

  const handleBackDrop = async (acceptedFiles: File[]) => {
    try {
      const file = acceptedFiles[0];
      if (!file || !file.type.startsWith("image/")) {
        onError("Invalid file type for back");
        return;
      }
      const formdata = new FormData();
      formdata.append("backImage", file);

      const res = await fetch(BACKEND_DATA_API_ENDPOINTS.OCR_UPLOAD_BACK, {
        method: "POST",
        body: formdata,
      });
      const result = await res.json();
      if (result.success) {
        const { extractedData } = result;
        const fullName = `${extractedData.name} ${extractedData.fathersName} ${extractedData.surname}`;
        const idNumber = extractedData.documentNumber;
        const birthDate = extractedData.dob;
        onComplete({
          frontPath,
          backPath: result.backPath,
          extractedData: { fullName, idNumber, birthDate },
        });
      } else {
        onError(result.message || "Back upload failed");
      }
    } catch (err) {
      onError("Back upload failed");
    }
  };

  return {
    frontUploaded,
    frontPath,
    handleFrontDrop,
    handleBackDrop,
  };
};