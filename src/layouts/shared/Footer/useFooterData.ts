import { useTranslation } from "react-i18next";
import { FaDiscord, FaTwitter, FaGithub, FaMedium } from "react-icons/fa";

interface FooterLink {
  label: string;
  path: string;
}

interface SocialLink {
  icon: React.ElementType;
  link: string;
}

/**
 * @function useFooterData
 * @description Provides the data for the footer sections (protocol links, social links, resource links, etc.).
 * @returns {object} An object containing arrays for protocolLinks, communityLinks, resourceLinks, and bottomLinks.
 */
export const useFooterData = () => {
  const { t } = useTranslation();

  // Protocol Links
  const protocolLinks: FooterLink[] = ["about", "docs", "whitepaper", "audits"].map(
    (item) => ({
      label: t(`footer.${item}`),
      path: `/${item}`,
    })
  );

  // Community (Social) Links
  const communityLinks: SocialLink[] = [
    { icon: FaDiscord, link: "https://discord.gg/chainelect" },
    { icon: FaTwitter, link: "https://twitter.com/chainelect" },
    { icon: FaGithub, link: "https://github.com/chainelect" },
    { icon: FaMedium, link: "https://medium.com/chainelect" },
  ];

  // Resource Links
  const resourceLinks: FooterLink[] = ["blog", "developers", "governance", "faq"].map(
    (item) => ({
      label: t(`footer.${item}`),
      path: `/${item}`,
    })
  );

  // Bottom Section Links
  const bottomLinks: FooterLink[] = ["terms", "privacy", "docs"].map((item) => ({
    label: t(`footer.${item}`),
    path: `/${item}`,
  }));

  return {
    protocolLinks,
    communityLinks,
    resourceLinks,
    bottomLinks,
  };
};