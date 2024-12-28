import React from "react";
import PropTypes from "prop-types";

export const InfoCard = (props) => {
  const { title, description, icon } = props;

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

InfoCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
