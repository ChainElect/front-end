// src/pages/Home/FeaturesSection.tsx
import React, { FC } from "react";
import { FeatureCard } from "@theme/src/components/cards/FeatureCard";
import { Feature } from "./useHomeData";

interface FeaturesSectionProps {
  features: Feature[];
}

export const FeaturesSection: FC<FeaturesSectionProps> = ({ features }) => {
  return (
    <section className="relative py-32">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-stretch">
          {features.map((feature) => (
            <div key={feature.key} className="h-full">
              <FeatureCard
                icon={feature.icon}
                title={feature.key}
                content={feature.content}
              />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
