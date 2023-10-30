"use client";

import { ComponentPropsWithoutRef } from "react";
import ThemeToggle from "@/app/components/ThemeToggle";
import { Popover, Transition } from "@headlessui/react";
import Image from "next/image";
import { logOut } from "@/services/auth";
import Boards from "../components/Boards";
import LogOutIcon from "../components/LogOutIcon";
import { useSelectedBoard } from "../providers/SelectedBoardProvider";

type BoardSelectPopoverType = ComponentPropsWithoutRef<"div"> & {
  onShowAddBoardModal: () => void;
};

export default function BoardSelectPopover({
  onShowAddBoardModal,
  ...props
}: BoardSelectPopoverType) {
  const {selectedBoard} = useSelectedBoard();

  return (
    <Popover className="relative" {...props}>
      <Popover.Button className="flex items-center gap-x-3 text-lg font-bold leading-tight">
        <span className="truncate">{selectedBoard ? selectedBoard.name : "Select board"}</span>
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
          <Boards onShowAddBoardModal={onShowAddBoardModal} />
          <div className="p-4 pb-0">
            <ThemeToggle />
          </div>
          <div className="px-4 py-6">
            <button onClick={logOut} className="flex items-center gap-x-3">
              <LogOutIcon />
              Log out
            </button>
          </div>
        </Popover.Panel>
      </Transition>
    </Popover>
  );
}
