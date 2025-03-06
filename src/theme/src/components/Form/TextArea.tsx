// src/foundation/forms/Textarea.tsx
import React, { FC, TextareaHTMLAttributes } from "react";
import { useThemeColors } from "@hooks/useThemeColors";
import clsx from "clsx";
import { Label } from "@theme/src/foundation/typography/Label";

export interface TextareaProps
  extends TextareaHTMLAttributes<HTMLTextAreaElement> {
  label?: string;
  inputSize?: "sm" | "md" | "lg";
  error?: boolean;
  errorMessage?: string;
}

export const Textarea: FC<TextareaProps> = ({
  label,
  inputSize = "md",
  error = false,
  errorMessage,
  className = "",
  style,
  ...props
}) => {
  const { text, background, border, error: errorColor } = useThemeColors();

  const sizeClasses = {
    sm: "px-3 py-1.5 text-sm",
    md: "px-4 py-2 text-base",
    lg: "px-5 py-3 text-lg",
  };

  return (
    <div className="w-full">
      {label && (
        <Label weight="semibold" className="mb-2 block">
          {label}
        </Label>
      )}
      <textarea
        {...props}
        className={clsx(
          "w-full border rounded-md focus:outline-none focus:ring-2 transition-colors",
          sizeClasses[inputSize],
          error ? "ring-2" : "focus:ring-2",
          className
        )}
        style={{
          borderColor: error
            ? errorColor
            : `color-mix(in srgb, ${border} 30%, transparent)`,
          backgroundColor: `color-mix(in srgb, ${background} 98%, transparent)`,
          color: text,
          ...(error && { borderColor: errorColor }),
          ...style,
        }}
      />
      {error && errorMessage && (
        <span className="text-sm mt-1" style={{ color: errorColor }}>
          {errorMessage}
        </span>
      )}
    </div>
  );
};
