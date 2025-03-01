import clsx from "clsx";

// utils/typography.ts
export const getTextStyles = (
    size: string,
    weight: string,
    className?: string
  ) => {
    return clsx(
      `text-${size}`,
      `font-${weight}`,
      className
    );
  };
  
  // Responsive text size utility
  export const responsiveText = {
    sm: 'text-sm',
    md: 'text-base',
    lg: 'text-lg',
    xl: 'text-xl'
  };