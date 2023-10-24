import { Board } from "@/../firebase/db";
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
  selectBoard: (board: Board | null) => void;
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

  useEffect(() => {
    if (!selectedBoard) {
      setSelectedBoard(boards[0]);
    }
  }, [boards]);

  const selectBoard = (board: Board | null) => {
    setSelectedBoard(board);
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
