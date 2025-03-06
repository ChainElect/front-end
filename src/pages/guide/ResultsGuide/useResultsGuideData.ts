import { useTranslation } from "react-i18next";

export interface ResultsGuideStep {
  icon: 'chart' | 'info';
  title: string;
  content: string;
}

export const useResultsGuideData = () => {
  const { t } = useTranslation();
  
  return {
    title: t('resultsGuide.title'),
    subtitle: t('resultsGuide.subtitle'),
    steps: t('resultsGuide.steps', { returnObjects: true }) as ResultsGuideStep[],
  };
};