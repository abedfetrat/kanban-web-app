import { ComponentPropsWithoutRef, forwardRef } from "react";

type InputType = ComponentPropsWithoutRef<"input"> & {
  error?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputType>(function Input(
  { error, ...props },
  ref,
) {
  const variants = {
    normal:
      "border-light-border focus:border-black dark:border-dark-border dark:focus:border-white",
    error: "border-danger",
  };
  return (
    <input
      {...props}
      ref={ref}
      className={`${
        error ? variants.error : variants.normal
      } rounded-[4px] border-[2px] bg-transparent px-4 py-2 font-medium leading-relaxed outline-none placeholder:text-black/25  dark:placeholder:text-white/25 ${
        props.className
      }`}
    />
  );
});

export default Input;
