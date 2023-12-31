"use client";

type ButtonType = React.ComponentPropsWithoutRef<"button"> & {
  color: "primary" | "secondary" | "danger";
  size: "small" | "large" | "variable";
};

export default function Button({
  className,
  color,
  size,
  children,
  ...props
}: ButtonType) {
  const colorVariants = {
    primary:
      "text-white bg-primary hover:bg-primary-hover disabled:hover:bg-primary",
    secondary:
      "dark:bg-white dark:hover:bg-white/80 text-primary bg-primary/10 hover:bg-primary/25 disabled:hover:bg-primary/10 disabled:dark:hover:bg-white",
    danger:
      "text-white bg-danger hover:bg-danger-hover disabled:hover:bg-danger",
  };

  const sizeVariants = {
    small: "px-5 py-3 text-sm",
    large: "px-6 py-4 text-base",
    variable: "px-5 py-3 text-sm md:px-6 md:py-4 md:text-base md:leading-none",
  };

  return (
    <button
      className={`${colorVariants[color]} ${sizeVariants[size]} rounded-full font-bold leading-none transition-colors disabled:opacity-25 ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
