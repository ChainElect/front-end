// src/pages/Home/Home.tsx
import React, { FC } from "react";
import { useTranslation } from "react-i18next";
import { useThemeColors } from "@hooks/useThemeColors";
import { HeroSection } from "./HeroSection";
import { FeaturesSection } from "./FeatureSection";
import { CTASection } from "./CTASection";
import { useHomeData } from "./useHomeData";

export const Home: FC = () => {
  const { features } = useHomeData();
  const { background } = useThemeColors();

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ backgroundColor: background }}
    >
      <HeroSection />
      <FeaturesSection features={features} />
      <CTASection />
    </div>
  );
};
