import Image from "next/image";
import AddTaskButton from "./AddTaskButton";
import BoardOptionsMenu from "./BoardOptionsMenu";
import BoardSelectPopover from "./BoardSelectPopover";
import LogoContainer from "./LogoContainer";
import { useSelectedBoard } from "./providers/SelectedBoardProvider";

type NavbarProps = {
  onShowAddBoardModal: () => void;
  onShowEditBoardModal: () => void;
  onShowDeleteBoardModal: () => void;
};

export default function Navbar({
  onShowAddBoardModal,
  onShowEditBoardModal,
  onShowDeleteBoardModal,
}: NavbarProps) {
  const { selectedBoard } = useSelectedBoard();

  return (
    <header className="flex border-light-border bg-white dark:border-dark-border dark:bg-dark-grey md:border-b-2">
      <LogoContainer />
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
        <BoardSelectPopover
          className="md:hidden"
          onShowAddBoardModal={onShowAddBoardModal}
        />
        <h1 className="hidden text-xl font-bold md:block desktop:text-2xl">
          {selectedBoard ? selectedBoard.name : ""}
        </h1>
        <div className="flex flex-grow items-center justify-end gap-x-4">
          <AddTaskButton />
          <BoardOptionsMenu
            onShowEditBoardModal={onShowEditBoardModal}
            onShowDeleteBoardModal={onShowDeleteBoardModal}
          />
        </div>
      </div>
    </header>
  );
}
