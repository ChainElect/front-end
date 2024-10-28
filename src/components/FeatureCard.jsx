import React from 'react';

const FeatureCard = ({ title, description, icon }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg p-6 hover:shadow-xl transition-shadow">
      <div className="flex items-center justify-center mb-4">
        <img src={icon} alt={`${title} icon`} className="h-12 w-12" />
      </div>
      <h3 className="text-xl font-semibold text-gray-800 mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
