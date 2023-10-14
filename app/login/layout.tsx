import Image from "next/image";
import React from "react";

export default function LoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <main className="grid h-screen place-items-center p-4 md:p-6">
      <section className="w-full max-w-[507px] rounded-xl bg-white px-4 py-12 dark:bg-dark-grey md:px-6 md:py-16">
        <div className="mb-12 flex justify-center md:mb-16">
          <Image
            src="/images/logo-dark.svg"
            width={200}
            height={34}
            alt="kanban logo"
            className="dark:hidden md:w-[260px]"
          />
          <Image
            src="/images/logo-light.svg"
            width={200}
            height={34}
            alt="kanban logo"
            className="hidden dark:block md:w-[260px]"
          />
        </div>
        {children}
      </section>
    </main>
  );
}
