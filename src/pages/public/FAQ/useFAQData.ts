import { useTranslation } from "react-i18next";

export interface FAQItem {
  question: string;
  answer: string;
}

export const useFAQData = () => {
  const { t } = useTranslation();
  
  return {
    faqTitle: t('resources.faqTitle'),
    faqSubtitle: t('resources.faqSubtitle'),
    questions: t('resourcesData.faqs', { returnObjects: true }) as FAQItem[]
  };
};