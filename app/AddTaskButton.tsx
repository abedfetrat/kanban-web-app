"use client";

import Button from "./components/Button";
import Image from "next/image";

export default function AddTaskButton() {
  return (
    <Button
      size="variable"
      color="primary"
      onClick={() => {
        console.log("Opening new task modal...");
      }}
    >
      <Image
        src="/images/icon-add-task-mobile.svg"
        width={12}
        height={12}
        alt=""
        className="min-w-[12px] md:hidden"
      />
      <span className="hidden md:inline">+ Add New Task</span>
    </Button>
  );
}
