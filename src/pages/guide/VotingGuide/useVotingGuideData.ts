import { useTranslation } from "react-i18next";

export interface VotingGuideStep {
    icon: 'userCheck' | 'listAlt' | 'voteYea' | 'checkCircle' | 'chartBar';
    title: string;
    content: string;
  }
  
  export interface VotingGuideCTASection {
    title: string;
    content: string;
    buttonText: string;
  }

  export const useVotingGuideData = () => {
    const { t } = useTranslation();
    
    return {
      title: t('votingGuide.title'),
      subtitle: t('votingGuide.subtitle'),
      steps: t('votingGuide.steps', { returnObjects: true }) as VotingGuideStep[],
      ctaSection: t('votingGuide.ctaSection', { returnObjects: true }) as VotingGuideCTASection
    };
  };