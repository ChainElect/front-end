import React from "react";

import { FeatureCard } from "../card/FeatureCard";

const features = [
  {
    id: "feature1",
    title: "Decentralized Voting",
    description: "Secure, transparent voting enabled by blockchain technology.",
    icon: "/path-to-icons/vote-icon.svg",
  },
  {
    id: "feature2",
    title: "Community Engagement",
    description: "Engage with a global community through our platform.",
    icon: "/path-to-icons/community-icon.svg",
  },
  {
    id: "feature3",
    title: "Low Transaction Fees",
    description: "Enjoy lower fees with a blockchain-powered voting system.",
    icon: "/path-to-icons/fees-icon.svg",
  },
  {
    id: "feature4",
    title: "Low Transaction Fees",
    description: "Enjoy lower fees with a blockchain-powered voting system.",
    icon: "/path-to-icons/fees-icon.svg",
  },
];

export const FeatureSection = () => {
  return (
    <section className="py-16 bg-gray-100">
      <div className="max-w-7xl mx-auto px-6 md:px-8">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">
          Our Features
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {features.map((feature) => (
            <FeatureCard
              key={feature.id}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
