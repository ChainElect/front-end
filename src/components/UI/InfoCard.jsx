import React from 'react';

const InfoCard = ({ title, description, icon }) => {
  return (
    <div className="border border-gray-300 rounded-lg p-6 shadow-sm hover:shadow-md transition-shadow">
      <div className="flex items-center mb-4">
        <img src={icon} alt="icon" className="h-6 w-6 mr-2" />
        <h3 className="text-lg font-semibold text-gray-800">{title}</h3>
      </div>
      <p className="text-gray-600">{description}</p>
    </div>
  );
};

export default InfoCard;
