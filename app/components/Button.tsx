export default function Button({
  color,
  children,
}: {
  color: "primary" | "secondary" | "danger";
  children: React.ReactNode;
}) {
  const colorVariants = {
    primary: "bg-primary hover:bg-primary-hover",
    secondary:
      "dark:bg-white dark:hover:bg-white/80 bg-primary/10 hover:bg-primary/25 text-primary",
    danger: "bg-danger hover:bg-danger-hover",
  };

  return (
    <button
      className={`${colorVariants[color]} rounded-3xl px-5 py-3 text-sm font-bold leading-none transition-colors md:px-8 md:py-3 md:text-base`}
    >
      {children}
    </button>
  );
}
