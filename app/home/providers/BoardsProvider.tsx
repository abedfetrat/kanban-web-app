import { Board, subscribeToBoardsCollection } from "@/services/db";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

type BoardsContextType = {
  boards: Board[];
  loading: boolean;
  error: string | null;
};

const BoardsContext = createContext<BoardsContextType>({
  boards: [],
  loading: true,
  error: null,
});

export default function BoardsProvider({ children }: { children: ReactNode }) {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    // TODO: add error handler
    const unsubscribe = subscribeToBoardsCollection((snapshot) => {
      const _boards: Board[] = [];
      snapshot.forEach((doc) => {
        const data = doc.data();
        _boards.push({
          id: data.id,
          name: data.name,
          createdAt: data.createdAt,
        });
      });
      setBoards(_boards);
      setLoading(false);
    });
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <BoardsContext.Provider
      value={{
        boards: boards,
        loading: loading,
        error: error,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
}

export function useBoards() {
  return useContext(BoardsContext);
}
