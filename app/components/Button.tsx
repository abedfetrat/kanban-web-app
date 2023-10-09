type ButtonType = React.ComponentPropsWithoutRef<"button"> & {
  color: "primary" | "secondary" | "danger";
  size: "small" | "large" | "variable";
};

export default function Button({
  className,
  color,
  size,
  children,
}: ButtonType) {
  const colorVariants = {
    primary: "bg-primary hover:bg-primary-hover ",
    secondary:
      "dark:bg-white dark:hover:bg-white/80 bg-primary/10 hover:bg-primary/25 text-primary",
    danger: "bg-danger hover:bg-danger-hover",
  };

  const sizeVariants = {
    small: "px-5 py-3 text-sm",
    large: "px-6 py-4 text-base",
    variable: "px-5 py-3 text-sm md:px-6 md:py-4 md:text-base md:leading-none",
  };

  return (
    <button
      className={`${colorVariants[color]} ${sizeVariants[size]} rounded-full font-bold leading-none text-white transition-colors ${className}`}
    >
      {children}
    </button>
  );
}
