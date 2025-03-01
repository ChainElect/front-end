// src/pages/public/About/useAboutData.tsx
import React from "react";
import { FaEye, FaShieldAlt, FaUserSecret } from "react-icons/fa";

export interface Feature {
  key: string;
  icon: React.ReactNode; // Ensure this is React.ReactNode
}

/**
 * @function useAboutData
 * @description Returns the static features array for the About page.
 */
export const useAboutData = () => {
  const features: Feature[] = [
    {
      key: "transparency",
      icon: <FaEye className="w-6 h-6" />,
    },
    {
      key: "security",
      icon: <FaShieldAlt className="w-6 h-6" />,
    },
    {
      key: "privacy",
      icon: <FaUserSecret className="w-6 h-6" />,
    },
  ];

  return { features };
};
