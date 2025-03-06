import { useTranslation } from "react-i18next";

export interface WalletGuideStep {
    icon: string;
    title: string;
    content: string;
  }
  
  export interface WalletGuideInfoBox {
    title: string;
    content: string;
  }
  
export const useWalletGuideData = () => {
  const { t } = useTranslation();
  
  return {
    title: t('walletGuide.title'),
    subtitle: t('walletGuide.subtitle'),
    securityNotice: t('walletGuide.securityNotice'),
    steps: t('walletGuide.steps', { returnObjects: true }),
    infoBox: t('walletGuide.infoBox', { returnObjects: true }),
    ctaButton: t('walletGuide.ctaButton')
  };
};