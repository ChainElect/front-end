import React from "react";
import PropTypes from "prop-types";
import { Card } from "@theme/src/components/cards/Card";
import { Paragraph, Title } from "@theme/src/foundation/typography";

export const FeatureCard = (props) => {
  const { title, description, icon } = props;

  return (
    <Card
      backgroundVariant="light"
      className="hover:shadow-xl transition-shadow p-6 rounded-lg"
    >
      <div className="flex items-center justify-center mb-4">
        <img src={icon} alt={`${title} icon`} className="h-12 w-12" />
      </div>
      <Title as="h3" size="xl" className="mb-2">
        {title}
      </Title>
      <Paragraph>{description}</Paragraph>
    </Card>
  );
};

FeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
};
