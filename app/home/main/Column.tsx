import { useModal } from "@/app/providers/ModalProvider";
import { Column, Task } from "@/services/db";
import { useMemo } from "react";
import TaskDetailModal from "../TaskDetailModal";
import { useTasks } from "../hooks/useTasks";

/* TODO: improve keyboard support */

export default function Column({
  column,
  index,
}: {
  column: Column;
  index: number;
}) {
  const { tasks } = useTasks(column.id);

  const color = (() => {
    if ((index + 1) % 3 === 0) {
      return "bg-green";
    } else if (index % 2 === 0) {
      return "bg-cyan";
    } else {
      return "bg-primary";
    }
  })();

  return (
    <div className="h-fit min-w-[280px]">
      {/* Header */}
      <div className="flex items-center gap-x-3">
        <div className={`h-[15px] w-[15px] rounded-full ${color}`}></div>
        <p className="text-xs font-bold uppercase tracking-[2.4px] text-medium-grey">
          {column.name} ({tasks.length})
        </p>
      </div>
      {/* Tasks */}
      <ul className="mt-6 flex flex-col gap-y-5">
        {tasks.map((task) => (
          <Task key={task.id} task={task} column={column} />
        ))}
      </ul>
    </div>
  );
}

function Task({ task, column }: { task: Task; column: Column }) {
  const { openModal } = useModal();

  const numCompletedSubtasks = useMemo(
    () => task.subtasks.filter((t) => t.completed).length,
    [task],
  );
  const numSubtasks = task.subtasks.length;

  return (
    <li>
      <button
        onClick={() => openModal(TaskDetailModal, { column, taskId: task.id })}
        className="w-full rounded-lg bg-white px-4 py-6 text-start shadow-surface-light outline-none hocus:text-primary dark:bg-dark-grey dark:shadow-surface-dark"
      >
        <h4 className="font-bold transition-colors">{task.name}</h4>
        <p className="mt-2 text-xs font-bold text-medium-grey">
          {numCompletedSubtasks} of {numSubtasks} subtasks
        </p>
      </button>
    </li>
  );
}
