import { Column, subscribeToColumnsCollection } from "@/services/db";
import { Unsubscribe } from "firebase/firestore";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";
import { useSelectedBoard } from "./SelectedBoardProvider";

type ColumnsContextType = {
  columns: Column[];
  loading: boolean;
  error: string | null;
};

const ColumnsContext = createContext<ColumnsContextType>({
  columns: [],
  loading: true,
  error: null,
});

export default function ColumnsProvider({ children }: { children: ReactNode }) {
  const { selectedBoard } = useSelectedBoard();
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: Unsubscribe | (() => void) = () => {};
    if (selectedBoard) {
      unsubscribe = subscribeToColumnsCollection(
        selectedBoard.id,
        (snapshot) => {
          const _columns: Column[] = [];
          snapshot.forEach((doc) => {
            const data = doc.data();
            _columns.push({
              id: data.id,
              name: data.name,
              createdAt: data.createdAt,
            });
          });
          setColumns(_columns);
          setLoading(false);
        },
      );
    }

    return () => {
      unsubscribe();
    };
  }, [selectedBoard]);

  return (
    <ColumnsContext.Provider
      value={{
        columns: columns,
        loading: loading,
        error: error,
      }}
    >
      {children}
    </ColumnsContext.Provider>
  );
}

export function useColumns() {
  return useContext(ColumnsContext);
}
