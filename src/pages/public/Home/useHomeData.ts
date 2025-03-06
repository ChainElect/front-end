// src/pages/Home/useHomeData.ts
/**
 * @file useHomeData.ts
 * @description Provides static data for the Home page.
 */

import { t } from "i18next";

export interface Feature {
    key: string;
    content: string;
    icon: string;
  }
  
  /**
   * @function useHomeData
   * @returns {{ features: Feature[] }} An object containing the features array.
   */
  export const useHomeData = () => {
    const features: Feature[] = [
      {
        key: t(`home.features.transparency.title`),
        content: t(`home.features.transparency.description`),
        icon: "M12 8c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z",
      },
      {
        key: t(`home.features.security.title`),
        content: t(`home.features.security.description`),
        icon: "M9 12l2 2 4-4m1 4v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z",
      },
      {
        key: t(`home.features.privacy.title`),
        content: t(`home.features.privacy.description`),
        icon: "M12 4a4 4 0 110 8 4 4 0 010-8z M6.343 14.343a8 8 0 0111.314 0M6.343 14.343A8 8 0 0112 18.657a8 8 0 015.657-4.314",
      },
    ];
  
    return { features };
  };