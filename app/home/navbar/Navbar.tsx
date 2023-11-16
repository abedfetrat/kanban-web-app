import { useModal } from "@/app/providers/ModalProvider";
import Image from "next/image";
import AddEditTaskModal from "../AddEditTaskModal";
import { useColumns } from "../hooks/useColumns";
import { useSelectedBoard } from "../providers/SelectedBoardProvider";
import AddTaskButton from "./AddTaskButton";
import BoardOptionsMenu from "./BoardOptionsMenu";
import BoardSelectPopover from "./BoardSelectPopover";
import LogoContainer from "./LogoContainer";

export default function Navbar() {
  const { openModal } = useModal();
  const { selectedBoard, loading } = useSelectedBoard();
  const { columns } = useColumns();

  const shouldDisableAddTaskButton =
    !selectedBoard || !columns || columns.length === 0;

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
        <BoardSelectPopover className="md:hidden" />
        <h1 className="hidden text-xl font-bold md:block desktop:text-2xl">
          {!loading && (selectedBoard ? selectedBoard.name : "Select a board")}
        </h1>
        <div className="flex flex-grow items-center justify-end gap-x-4">
          <AddTaskButton
            disabled={shouldDisableAddTaskButton}
            onClick={() => openModal(AddEditTaskModal, { mode: "add" })}
          />
          {selectedBoard && <BoardOptionsMenu />}
        </div>
      </div>
    </header>
  );
}
