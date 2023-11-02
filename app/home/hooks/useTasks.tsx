import { Task, subscribeToTasksCollection } from "@/services/db";
import { useEffect, useState } from "react";
import { useSelectedBoard } from "../providers/SelectedBoardProvider";

export function useTasks(columnId: string) {
  const { selectedBoard, loading: loadingBoard } = useSelectedBoard();
  const [tasks, setTasks] = useState<Task[]>([]);
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
        unsubscribe = subscribeToTasksCollection(
          selectedBoard.id,
          columnId,
          (snapshot) => {
            const _tasks: Task[] = [];
            snapshot.forEach((doc) => {
              const data = doc.data();
              _tasks.push({
                id: data.id,
                name: data.name,
                createdAt: data.createdAt,
                description: data.description,
                subtasks: data.subtasks,
              });
            });
            setTasks(_tasks);
            setLoading(false);
          },
        );
      } catch (error) {
        console.log(error);
        setError(`Error loading tasks for board "${selectedBoard.name}"`);
        setLoading(false);
      }
    } else {
      setLoading(false);
    }

    return () => {
      unsubscribe();
    };
  }, [selectedBoard, loadingBoard, columnId]);

  return { tasks, loading, error };
}
