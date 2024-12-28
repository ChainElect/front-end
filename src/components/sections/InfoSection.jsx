import React from "react";

import { InfoCard } from "../card/InfoCard";

// Replace these with your actual icons and content
const infoCards = [
  {
    id: "info1",
    title: "Title",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    icon: "/path-to-icons/info-icon.svg",
  },
  {
    id: "info2",
    title: "Title",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    icon: "/path-to-icons/info-icon.svg",
  },
  {
    id: "info3",
    title: "Title",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    icon: "/path-to-icons/info-icon.svg",
  },
  {
    id: "info4",
    title: "Title",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    icon: "/path-to-icons/info-icon.svg",
  },
  {
    id: "info5",
    title: "Title",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    icon: "/path-to-icons/info-icon.svg",
  },
  {
    id: "info6",
    title: "Title",
    description:
      "Body text for whatever you’d like to say. Add main takeaway points, quotes, anecdotes, or even a very very short story.",
    icon: "/path-to-icons/info-icon.svg",
  },
];

export const InfoSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-6 md:px-8 text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">Heading</h2>
        <p className="text-gray-500 mb-12">Subheading</p>

        {/* Card Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {infoCards.map((card) => (
            <InfoCard
              key={card.id}
              title={card.title}
              description={card.description}
              icon={card.icon}
            />
          ))}
        </div>
      </div>
    </section>
  );
};
