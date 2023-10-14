"use client";

import Image from "next/image";
import { useSidebarToggleState } from "./SidebarToggleStateProvider";

export default function LogoContainer() {
  const { showSidebar, toggleSidebar } = useSidebarToggleState();
  return (
    !showSidebar && (
      <div className="hidden place-items-center border-r-2 border-light-border px-6 py-4 dark:border-dark-border md:grid desktop:px-8">
        <Image
          src="/images/logo-dark.svg"
          width={153}
          height={26}
          alt="kanban logo"
          className="min-w-[153px] dark:hidden"
        />
        <Image
          src="/images/logo-light.svg"
          width={153}
          height={26}
          alt="kanban logo"
          className="hidden min-w-[153px] dark:block"
        />
      </div>
    )
  );
}