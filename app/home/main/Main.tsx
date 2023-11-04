import Button from "@/app/components/Button";
import { ComponentPropsWithoutRef } from "react";
import { useColumns } from "../hooks/useColumns";
import { useSelectedBoard } from "../providers/SelectedBoardProvider";
import Column from "./Column";

export default function Main({
  onShowAddBoardModal,
  onShowEditBoardModal,
}: {
  onShowAddBoardModal: () => void;
  onShowEditBoardModal: () => void;
}) {
  const { selectedBoard, loading: loadingBoard } = useSelectedBoard();
  const { columns, loading: loadingColumns } = useColumns();

  const shouldRenderEmptyState =
    !selectedBoard || !columns || columns.length === 0;

  if (loadingBoard || loadingColumns) return;

  if (shouldRenderEmptyState) {
    return (
      <EmptyState
        selectedBoard={!!selectedBoard}
        onShowAddBoardModal={onShowAddBoardModal}
        onShowEditBoardModal={onShowEditBoardModal}
      />
    );
  }

  return (
    <Container className="flex gap-x-6">
      {columns.map((col, index) => (
        <Column key={col.id} column={col} index={index} />
      ))}
      <button
        className="transition-colors mt-[39px] grid min-w-[280px] place-items-center rounded-lg bg-gradient-to-b from-[#E9EFFA] to-[#E9EFFA]/50 text-2xl font-bold text-medium-grey outline-none hocus:text-primary dark:from-dark-grey dark:to-dark-grey/25"
        onClick={onShowEditBoardModal}
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

function EmptyState({
  selectedBoard,
  onShowAddBoardModal,
  onShowEditBoardModal,
}: {
  selectedBoard: boolean;
  onShowAddBoardModal: () => void;
  onShowEditBoardModal: () => void;
}) {
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
          onClick={selectedBoard ? onShowEditBoardModal : onShowAddBoardModal}
        >
          {selectedBoard ? "+ Add New Column" : "+ Create New Board"}
        </Button>
      </section>
    </Container>
  );
}
