import { Board } from "@/../services/db";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useBoards } from "./BoardsProvider";

type SelectedBoardContextType = {
  selectedBoard: Board | null;
  selectBoard: (id: string) => void;
};

const SelectedBoardContext = createContext<SelectedBoardContextType>({
  selectedBoard: null,
  selectBoard: () => {},
});

export default function SelectedBoardProvider({
  children,
}: {
  children: ReactNode;
}) {
  const { boards } = useBoards();
  const [selectedBoard, setSelectedBoard] = useState<Board | null>(null);
  const [selectedBoardId, setSelectedBoardId] = useState<string | null>(null);

  useEffect(() => {
    const board = boards.find((b) => b.id === selectedBoardId);
    if (board) {
      setSelectedBoard(board);
    } else {
      setSelectedBoard(boards[0]);
    }
  }, [selectedBoardId, boards]);

  const selectBoard = (id: string) => {
    setSelectedBoardId(id);
  };

  return (
    <SelectedBoardContext.Provider
      value={{
        selectedBoard: selectedBoard,
        selectBoard: selectBoard,
      }}
    >
      {children}
    </SelectedBoardContext.Provider>
  );
}

export function useSelectedBoard() {
  return useContext(SelectedBoardContext);
}
