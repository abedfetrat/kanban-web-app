import { Board, subscribeToBoardsCollection } from "@/services/db";
import { useEffect, useState } from "react";

export function useBoards() {
  const [boards, setBoards] = useState<Board[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe = () => {};
    try {
      unsubscribe = subscribeToBoardsCollection((snapshot) => {
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
    } catch (error) {
      console.log(error);
      setError("Error loading boards.");
      setLoading(false);
    }
    return () => {
      unsubscribe();
    };
  }, []);

  return { boards, loading, error };
}
