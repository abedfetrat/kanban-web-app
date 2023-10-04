import { useState } from "react";
import { Popover, Switch, Transition } from "@headlessui/react";
import Image from "next/image";

export default function BoardSelectPopover(
  props: React.ComponentPropsWithoutRef<"div">,
) {
  const [enabled, setEnabled] = useState(false);
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
          <div className="px-6 py-4 text-sm uppercase tracking-[2.4px]">
            All Boards (3)
          </div>
          <ul className="pr-6">
            <li>
              <button className="flex w-full items-center gap-x-4 rounded-r-full bg-primary px-6 py-4 font-bold text-white">
                <BoardIcon className="fill-white" />
                Platform Launch
              </button>
            </li>
            <li>
              <button className="flex w-full items-center gap-x-4 rounded-r-full px-6 py-4 font-bold">
                <BoardIcon className="fill-medium-grey" />
                Marketing Plan
              </button>
            </li>
            <li>
              <button className="flex w-full items-center gap-x-4 rounded-r-full px-6 py-4 font-bold">
                <BoardIcon className="fill-medium-grey" />
                Roadmap
              </button>
            </li>
            <li>
              <button className="flex w-full items-center gap-x-4 rounded-r-full px-6 py-4 font-bold text-primary">
                <BoardIcon className="fill-primary" />+ Create New Board
              </button>
            </li>
          </ul>
          <div className="p-4">
            <div className="flex items-center justify-center gap-x-6 rounded-md bg-light-grey p-3 dark:bg-very-dark-grey">
              <Image
                src="images/icon-light-theme.svg"
                width={19}
                height={19}
                alt=""
              />
              <Switch
                checked={enabled}
                onChange={setEnabled}
                className="relative inline-flex h-5 w-10 items-center rounded-full bg-primary"
              >
                <span
                  className={`${
                    enabled ? "translate-x-[22px]" : "translate-x-1"
                  } inline-block h-[14px] w-[14px] transform rounded-full bg-white transition`}
                />
              </Switch>
              <Image
                src="images/icon-dark-theme.svg"
                width={16}
                height={16}
                alt=""
              />
            </div>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}

const BoardIcon = (props: React.SVGProps<SVGSVGElement>) => (
  <svg width="16" height="16" {...props}>
    <path d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z" />
  </svg>
);
