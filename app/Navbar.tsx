import Image from "next/image";
import BoardOptionsMenu from "./BoardOptionsMenu";
import BoardSelectPopover from "./BoardSelectPopover";
import Button from "./components/Button";
import { THEMES, useTheme } from "./providers/ThemeProvider";

type NavbarProps = {
  showSidebar: boolean;
};

export default function Navbar({ showSidebar }: NavbarProps) {
  const { theme, toggleTheme } = useTheme();

  return (
    <header className="flex border-light-border bg-white dark:border-dark-border dark:bg-dark-grey md:border-b-2">
      {!showSidebar && (
        <div className="hidden place-items-center border-r-2 border-light-border px-6 py-4 dark:border-dark-border md:grid desktop:px-8">
          <Image
            src={`images/logo-${theme === THEMES.light ? "dark" : "light"}.svg`}
            width={153}
            height={26}
            alt="kanban logo"
            className="min-w-[153px]"
          />
        </div>
      )}
      <div className="flex w-full items-center gap-x-4 px-4 py-5 desktop:px-8 desktop:pb-7">
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
        <h1 className="hidden text-xl font-bold md:block desktop:text-2xl">
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
      </div>
    </header>
  );
}
