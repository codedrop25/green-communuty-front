import { LoaderCircle } from "lucide-react";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "brand" | "secondary" | "ghost" | "danger";
  size?: "sm" | "md" | "lg";
  loading?: boolean;
  leftIcon?: ReactNode;
};

const variants = {
  primary: "bg-primary text-white hover:bg-primary-hover",
  brand: "bg-brand text-white hover:bg-brand-hover",
  secondary: "border border-border bg-surface text-fg hover:bg-surface-subtle",
  ghost: "text-fg-secondary hover:bg-surface-muted",
  danger: "text-danger hover:bg-red-50",
};

const sizes = {
  sm: "h-7 px-2.5 text-[13px]",
  md: "h-8 px-3 text-[13px]",
  lg: "h-10 px-4 text-sm",
};

export function Button({
  className,
  variant = "primary",
  size = "md",
  loading = false,
  leftIcon,
  children,
  disabled,
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "inline-flex items-center justify-center gap-1.5 rounded-md font-medium transition-colors duration-150 disabled:cursor-not-allowed disabled:opacity-50",
        variants[variant],
        sizes[size],
        className,
      )}
      disabled={disabled || loading}
      {...props}
    >
      {loading ? <LoaderCircle aria-hidden="true" className="size-3.5 animate-spin" /> : leftIcon}
      {children}
    </button>
  );
}
