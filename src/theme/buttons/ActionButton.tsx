import React, { FC } from "react";

export interface ActionButtonProps {
  text?: string;
  onClick?: () => void;
}

export const ActionButton: FC<ActionButtonProps> = ({
  text = "Register your identity",
  onClick = () => {},
}) => {
  return (
    <button
      onClick={onClick}
      aria-label={text}
      className="
        relative
        inline-flex
        items-center
        bg-primary
        text-white
        rounded-full
        px-6
        py-3
        transition-all
        duration-300
        ease-in-out
        group
        focus:outline-none
        focus:ring-2 focus:ring-primary focus:ring-offset-2
        hover:pr-14
      "
    >
      <span className="transition-all duration-300 ease-in-out">{text}</span>
      {/* Arrow icon, absolutely placed */}
      <span
        className="
          absolute
          right-8
          opacity-0
          transition-opacity
          duration-300
          ease-in-out
          group-hover:opacity-100
        "
      >
        →
      </span>
    </button>
  );
};
