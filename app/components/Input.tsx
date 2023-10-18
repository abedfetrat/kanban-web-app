import { ComponentPropsWithoutRef, forwardRef } from "react";

type InputType = ComponentPropsWithoutRef<"input"> & {
  error?: boolean;
};

const Input = forwardRef<HTMLInputElement, InputType>(function Input(
  { error, ...props },
  ref,
) {
  return (
    <input
      {...props}
      ref={ref}
      className={`rounded-[4px] border-[2px] border-light-border bg-transparent px-4 py-2 font-medium leading-relaxed outline-none placeholder:text-black/25 focus:border-black dark:border-dark-border dark:placeholder:text-white/25 dark:focus:border-white ${
        error &&
        "border border-danger focus:border-danger dark:border-danger dark:focus:border-danger"
      } ${props.className}`}
    />
  );
});

export default Input;
