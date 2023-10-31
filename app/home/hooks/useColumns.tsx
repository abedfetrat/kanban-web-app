import { Column, subscribeToColumnsCollection } from "@/services/db";
import { useEffect, useState } from "react";
import { useSelectedBoard } from "../providers/SelectedBoardProvider";

export function useColumns() {
  const { selectedBoard, loading: loadingBoard } = useSelectedBoard();
  const [columns, setColumns] = useState<Column[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe = () => {};

    if (loadingBoard) {
      setLoading(true);
      return;
    }

    if (selectedBoard) {
      try {
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
      } catch (error) {
        console.log(error);
        setError(`Error loading columns for board "${selectedBoard.name}"`);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    return () => {
      unsubscribe();
    };
  }, [selectedBoard, loadingBoard]);

  return { columns, loading, error };
}
