import Button from "@/app/components/Button";
import { useModal } from "@/app/providers/ModalProvider";
import { ComponentPropsWithoutRef } from "react";
import AddEditBoardModal from "../AddEditBoardModal";
import { useColumns } from "../hooks/useColumns";
import { useSelectedBoard } from "../providers/SelectedBoardProvider";
import Column from "./Column";

export default function Main() {
  const { selectedBoard, loading: loadingBoard } = useSelectedBoard();
  const { columns, loading: loadingColumns } = useColumns();
  const { openModal } = useModal();

  const shouldRenderEmptyState =
    !selectedBoard || !columns || columns.length === 0;

  if (loadingBoard || loadingColumns) return;

  if (shouldRenderEmptyState) {
    return <EmptyState selectedBoard={!!selectedBoard} />;
  }

  return (
    <Container className="flex gap-x-6">
      {columns.map((col, index) => (
        <Column key={col.id} column={col} index={index} />
      ))}
      <button
        className="mt-[39px] grid min-w-[280px] place-items-center rounded-lg bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 text-2xl font-bold text-medium-grey outline-none transition-colors hocus:text-primary dark:from-dark-grey dark:to-dark-grey/25"
        onClick={() => openModal(AddEditBoardModal, { mode: "edit" })}
      >
        + New Column
      </button>
    </Container>
  );
}

function Container({ className, children }: ComponentPropsWithoutRef<"main">) {
  return (
    <main
      className={`h-full w-full overflow-auto px-4 py-6 md:px-6 ${className}`}
    >
      {children}
    </main>
  );
}

function EmptyState({ selectedBoard }: { selectedBoard: boolean }) {
  const { openModal } = useModal();

  return (
    <Container className="grid place-items-center">
      <section className="text-center">
        <p className="text-lg font-bold text-medium-grey">
          {selectedBoard
            ? "This board is empty. Create a new column to get started."
            : "You don’t have any boards. Create a new board to get started."}
        </p>
        <Button
          size="large"
          className="mt-6"
          color="primary"
          onClick={() =>
            openModal(AddEditBoardModal, {
              mode: selectedBoard ? "edit" : "add",
            })
          }
        >
          {selectedBoard ? "+ Add New Column" : "+ Create New Board"}
        </Button>
      </section>
    </Container>
  );
}
