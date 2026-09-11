import React from "react";

export type BadgeVariant =
  | "default"
  | "success"
  | "warning"
  | "danger"
  | "info"
  | "outline";
export type BadgeSize = "sm" | "md";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
  size?: BadgeSize;
  dot?: boolean;
}

const variantStyles: Record<BadgeVariant, { container: string; dot: string }> =
  {
    default: {
      container: "bg-slate-100 text-slate-700 border-slate-200",
      dot: "bg-slate-400",
    },
    success: {
      container: "bg-emerald-50 text-emerald-700 border-emerald-200",
      dot: "bg-emerald-500",
    },
    warning: {
      container: "bg-amber-50 text-amber-700 border-amber-200",
      dot: "bg-amber-500",
    },
    danger: {
      container: "bg-rose-50 text-rose-700 border-rose-200",
      dot: "bg-rose-500",
    },
    info: {
      container: "bg-blue-50 text-blue-700 border-blue-200",
      dot: "bg-blue-500",
    },
    outline: {
      container: "bg-white text-slate-700 border-slate-300",
      dot: "bg-slate-400",
    },
  };

const sizeStyles: Record<BadgeSize, string> = {
  sm: "text-[11px] px-2 py-0.5 gap-1.5 font-medium",
  md: "text-xs px-2.5 py-1 gap-1.5 font-medium",
};

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = "default",
  size = "md",
  dot = false,
  className = "",
  ...rest
}) => {
  const current = variantStyles[variant];

  return (
    <span
      className={`
        inline-flex items-center rounded-full border
        ${current.container}
        ${sizeStyles[size]}
        ${className}
      `.trim()}
      {...rest}
    >
      {dot && (
        <span
          className={`w-1.5 h-1.5 rounded-full ${current.dot}`}
          aria-hidden="true"
        />
      )}
      {children}
    </span>
  );
};
