import React, { FC } from "react";

export const AnimatedButton: FC = () => {
  return (
    <button
      className="
        inline-flex
        items-center
        justify-center
        px-20
        py-3
        text-black
        bg-white
        border
        border-black
        rounded-full
        transition-colors
        duration-300
        ease-in-out
        hover:bg-black
        hover:text-white
      "
    >
      Login
    </button>
  );
};
