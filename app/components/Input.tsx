import { ComponentPropsWithoutRef } from "react";

export default function Input(props: ComponentPropsWithoutRef<"input">) {
  return (
    <input
      {...props}
      className={`px-4 py-2 rounded-[4px] border-[2px] border-light-border bg-transparent dark:border-dark-border ${props.className}`}
    />
  );
}
