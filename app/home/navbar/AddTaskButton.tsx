"use client";

import Button from "@/app/components/Button";
import Image from "next/image";

export default function AddTaskButton({ disabled }: { disabled: boolean }) {
  return (
    <Button
      size="variable"
      color="primary"
      disabled={disabled}
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
