// types/registration.ts
export interface RegistrationData {
  frontPath: string | null;
  backPath: string | null;
  extractedData: {
    fullName: string;
    idNumber: string;
    birthDate: string;
  };
  selfiePhotoPath: string | null;
  verificationStatus: string;
}
  
  export type RegistrationStep = 
    | 'ID_UPLOAD'
    | 'SELFIE_CAPTURE'
    | 'VERIFICATION';