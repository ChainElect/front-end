// src/pages/Home/useHomeData.ts
/**
 * @file useHomeData.ts
 * @description Provides static data for the Home page.
 */

export interface Feature {
    key: string;
    icon: string;
  }
  
  /**
   * @function useHomeData
   * @returns {{ features: Feature[] }} An object containing the features array.
   */
  export const useHomeData = () => {
    const features: Feature[] = [
      {
        key: "transparency",
        icon: "M12 8c-3.866 0-7 3.134-7 7s3.134 7 7 7 7-3.134 7-7-3.134-7-7-7z",
      },
      {
        key: "security",
        icon: "M9 12l2 2 4-4m1 4v6a2 2 0 01-2 2H8a2 2 0 01-2-2v-6a2 2 0 012-2h8a2 2 0 012 2z",
      },
      {
        key: "privacy",
        icon: "M12 4a4 4 0 110 8 4 4 0 010-8z M6.343 14.343a8 8 0 0111.314 0M6.343 14.343A8 8 0 0112 18.657a8 8 0 015.657-4.314",
      },
    ];
  
    return { features };
  };