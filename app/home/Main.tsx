import Button from "@/app/components/Button";
import { useColumns } from "./hooks/useColumns";
import { useSelectedBoard } from "./providers/SelectedBoardProvider";

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

  return (
    <main className="grid flex-1 place-items-center px-4 pt-6 md:px-6">
      <section className="text-center">
        {shouldRenderEmptyState && (
          <EmptyState
            selectedBoard={!!selectedBoard}
            onShowAddBoardModal={onShowAddBoardModal}
            onShowEditBoardModal={onShowEditBoardModal}
          />
        )}
      </section>
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
    <>
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
    </>
  );
}
