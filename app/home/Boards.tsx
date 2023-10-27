import { ComponentPropsWithoutRef } from "react";
import { Board } from "../../firebase/db";
import { useBoards } from "./providers/BoardsProvider";
import { useSelectedBoard } from "./providers/SelectedBoardProvider";

type BoardsType = ComponentPropsWithoutRef<"div"> & {
  onShowAddBoardModal: () => void;
};

export default function Boards({
  onShowAddBoardModal,
  className,
  ...props
}: BoardsType) {
  const { boards, loading, error } = useBoards();
  const { selectedBoard, selectBoard } = useSelectedBoard();

  return (
    <div className={`font-bold text-medium-grey ${className}`} {...props}>
      <div className="px-6 py-4 text-sm uppercase tracking-[2.4px]">
        All Boards ({boards.length})
      </div>
      <ul className="pr-6">
        {boards.map((board: Board) => (
          <BoardItem
            key={board.id}
            board={board}
            selected={selectedBoard?.id === board.id}
            onClick={() => selectBoard(board.id)}
          />
        ))}
        <li>
          <button
            className="flex w-full items-center gap-x-4 rounded-r-full px-6 py-4 font-bold text-primary transition-colors hocus:bg-primary-hover/10 hocus:text-primary dark:hocus:bg-white dark:hocus:text-primary"
            onClick={onShowAddBoardModal}
          >
            <BoardIcon />
            <span>+ Create New Board</span>
          </button>
        </li>
      </ul>
    </div>
  );
}

const BoardIcon = () => (
  <svg width="16" height="16" className="min-w-[16px]">
    <path
      fill="currentColor"
      d="M0 2.889A2.889 2.889 0 0 1 2.889 0H13.11A2.889 2.889 0 0 1 16 2.889V13.11A2.888 2.888 0 0 1 13.111 16H2.89A2.889 2.889 0 0 1 0 13.111V2.89Zm1.333 5.555v4.667c0 .859.697 1.556 1.556 1.556h6.889V8.444H1.333Zm8.445-1.333V1.333h-6.89A1.556 1.556 0 0 0 1.334 2.89V7.11h8.445Zm4.889-1.333H11.11v4.444h3.556V5.778Zm0 5.778H11.11v3.11h2a1.556 1.556 0 0 0 1.556-1.555v-1.555Zm0-7.112V2.89a1.555 1.555 0 0 0-1.556-1.556h-2v3.111h3.556Z"
    />
  </svg>
);

const BoardItem = ({
  board,
  selected,
  onClick,
}: {
  board: Board;
  selected: boolean;
  onClick: () => void;
}) => {
  const variant = selected
    ? "bg-primary text-white"
    : "hocus:bg-primary-hover/10 hocus:text-primary dark:hocus:bg-white dark:hocus:text-primary";
  return (
    <li>
      <button
        className={`${variant} flex w-full items-center gap-x-4 rounded-r-full px-6 py-4 font-bold transition-colors`}
        onClick={onClick}
      >
        <BoardIcon />
        <span className="truncate">{board.name}</span>
      </button>
    </li>
  );
};
