import React from "react";

export interface SkipToContentProps {
  targetId?: string;
  label?: string;
}

export const SkipToContent: React.FC<SkipToContentProps> = ({
  targetId = "main-content",
  label = "Skip to main content",
}) => {
  return (
    <a
      href={`#${targetId}`}
      className="
        sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 focus:z-50
        px-4 py-2 bg-slate-900 text-white font-medium text-sm rounded-lg shadow-lg
        ring-2 ring-primary-500 ring-offset-2 transition-transform
      "
    >
      {label}
    </a>
  );
};
