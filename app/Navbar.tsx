"use client";

import Image from "next/image";
import Button from "./components/Button";
import BoardSelectPopover from "./BoardSelectPopover";
import BoardOptionsMenu from "./BoardOptionsMenu";

export default function Navbar() {
  return (
    <header className="flex items-center gap-x-4 bg-white px-4 py-5 dark:bg-dark-grey md:px-6 md:pb-7">
      <div className="md:hidden">
        <Image
          src="/images/logo-mobile.svg"
          width={24}
          height={25}
          alt="kanaban logo"
          className="min-w-[24px]"
        />
      </div>
      <BoardSelectPopover className="md:hidden" />
      <h1 className="hidden text-xl font-bold md:block lg:text-2xl">
        Platform Launch
      </h1>
      <div className="flex flex-grow items-center justify-end gap-x-4">
        <Button color="primary">
          <Image
            src="/images/icon-add-task-mobile.svg"
            width={12}
            height={12}
            alt=""
            className="min-w-[12px] md:hidden"
          />
          <span className="hidden font-bold text-white md:inline">
            + Add New Task
          </span>
        </Button>
        <BoardOptionsMenu />
      </div>
    </header>
  );
}
