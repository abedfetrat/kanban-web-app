"use client";
import { useState } from "react";
import Image from "next/image";
import { Switch } from "@headlessui/react";

export default function ThemeToggle() {
  const [enabled, setEnabled] = useState(false);

  return (
    <div className="flex items-center justify-center gap-x-6 rounded-md bg-light-grey p-3 dark:bg-very-dark-grey">
      <Image src="images/icon-light-theme.svg" width={19} height={19} alt="" />
      <Switch
        checked={enabled}
        onChange={setEnabled}
        className="hocus:bg-primary-hover relative inline-flex h-5 w-10 items-center rounded-full bg-primary transition-colors"
      >
        <span
          className={`${
            enabled ? "translate-x-[22px]" : "translate-x-1"
          } inline-block h-[14px] w-[14px] transform rounded-full bg-white transition`}
        />
      </Switch>
      <Image src="images/icon-dark-theme.svg" width={16} height={16} alt="" />
    </div>
  );
}
