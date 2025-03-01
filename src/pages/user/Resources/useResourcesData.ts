/**
 * @file useResourcesData.ts
 * @description Provides static data for the Resources page in a type-safe manner.
 */

import { t } from "i18next";

/**
 * @interface Tutorial
 * @description Represents a tutorial resource.
 */
export interface Tutorial {
    title: string;
    link: string;
    icon: string;
  }
  
  /**
   * @interface FAQ
   * @description Represents a FAQ entry.
   */
  export interface FAQ {
    question: string;
    answer: string;
  }
  
  /**
   * @interface AdditionalResource
   * @description Represents an additional resource link.
   */
  export interface AdditionalResource {
    title: string;
    link: string;
    icon: string;
  }
  
  /**
   * @function useResourcesData
   * @description Returns static data arrays for tutorials, FAQs, and additional resources.
   * @returns {{
   *   tutorials: Tutorial[],
   *   faqs: FAQ[],
   *   additionalResources: AdditionalResource[]
   * }} An object containing all resource data.
   */
  export const useResourcesData = () => {
    const tutorials = t("resourcesData.tutorials", { returnObjects: true }) as Tutorial[];
    const faqs = t("resourcesData.faqs", { returnObjects: true }) as FAQ[];
    const additionalResources = t("resourcesData.additionalResources", { returnObjects: true }) as AdditionalResource[];
  

    return { tutorials, faqs, additionalResources };
  };