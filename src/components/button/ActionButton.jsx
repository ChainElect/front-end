import React from "react";

export const ActionButton = () => {
  return (
    <button
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
        hover:pr-14
      "
    >
      <span className="transition-all duration-300 ease-in-out">
        Register your identity
      </span>

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
