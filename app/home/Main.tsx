import Button from "@/components/Button";
import { Board } from "../../firebase/db";
import { useColumns } from "./providers/ColumnsProvider";
import { useSelectedBoard } from "./providers/SelectedBoardProvider";

export default function Main({
  onShowAddBoardModal,
  onShowEditBoardModal,
}: {
  onShowAddBoardModal: () => void;
  onShowEditBoardModal: () => void;
}) {
  const { selectedBoard } = useSelectedBoard();
  const { columns } = useColumns();

  const shouldRenderEmptyState =
    !selectedBoard || !columns || columns.length === 0;

  return (
    <main className="grid flex-1 place-items-center px-4 pt-6 md:px-6">
      <section className="text-center">
        {shouldRenderEmptyState && (
          <EmptyState
            selectedBoard={selectedBoard}
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
  selectedBoard: Board | null;
  onShowAddBoardModal: () => void;
  onShowEditBoardModal: () => void;
}) {
  if (!selectedBoard) {
    return (
      <>
        <p className="text-lg font-bold text-medium-grey">
          You don&rsquo;t have any boards. Create a new board to get started.
        </p>
        <Button
          size="large"
          className="mt-6"
          color="primary"
          onClick={onShowAddBoardModal}
        >
          + Create New Board
        </Button>
      </>
    );
  }

  return (
    <>
      <p className="text-lg font-bold text-medium-grey">
        This board is empty. Create a new column to get started.
      </p>
      <Button
        size="large"
        className="mt-6"
        color="primary"
        onClick={onShowEditBoardModal}
      >
        + Add New Column
      </Button>
    </>
  );
}
