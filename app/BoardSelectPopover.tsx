"use client";

import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import Boards from "./components/Boards";
import ThemeToggle from "./components/ThemeToggle";

export default function BoardSelectPopover(
  props: React.ComponentPropsWithoutRef<"div">,
) {
  return (
    <Popover className="relative" {...props}>
      <Popover.Button className="flex items-center gap-x-3 text-lg font-bold leading-tight">
        <span className="truncate">Platform Launch</span>
        <Image
          className="ui-open:rotate-180 ui-open:transform"
          src="images/icon-chevron-down.svg"
          width={10}
          height={7}
          alt=""
        />
      </Popover.Button>
      <Popover.Overlay className="fixed inset-0 bg-black opacity-50" />
      <Transition
        enter="transition duration-100 ease-out"
        enterFrom="transform scale-95 opacity-0"
        enterTo="transform scale-100 opacity-100"
        leave="transition duration-75 ease-out"
        leaveFrom="transform scale-100 opacity-100"
        leaveTo="transform scale-95 opacity-0"
      >
        <Popover.Panel className="absolute top-[calc(100%+2.5rem)] z-10 w-max min-w-[264px] rounded-lg bg-white font-bold text-medium-grey dark:bg-dark-grey">
          <Boards />
          <div className="p-4">
            <ThemeToggle />
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
