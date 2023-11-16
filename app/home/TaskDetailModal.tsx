import {
  Column,
  Subtask,
  Task,
  changeTaskColumn,
  updateSubtaskCompletion,
} from "@/services/db";
import { Dialog } from "@headlessui/react";
import { useMemo } from "react";
import toast from "react-hot-toast";
import Dropdown from "../components/Dropdown";
import TaskOptionsMenu from "./TaskOptionsMenu";
import Modal, { BaseModalType } from "@/app/components/Modal";
import { useColumns } from "./hooks/useColumns";
import { useSelectedBoard } from "./providers/SelectedBoardProvider";

type TaskDetailModalType = BaseModalType & {
  task: Task;
  column: Column;
};

function TaskDetailModal({
  isOpen,
  onClose,
  task,
  column,
}: TaskDetailModalType): React.ReactElement {
  const numCompletedSubtasks = useMemo(
    () => task.subtasks.filter((t) => t.completed).length,
    [task],
  );

  const { columns } = useColumns();
  const { selectedBoard } = useSelectedBoard();

  const handleSubtaskCompletionChange = async (
    subtaskId: string,
    completed: boolean,
  ) => {
    try {
      await updateSubtaskCompletion(
        selectedBoard!.id,
        column.id,
        task.id,
        subtaskId,
        completed,
      );
    } catch (error) {
      console.log(error);
      toast.error("Could not change completion.");
    }
  };

  const handleColumnSelectionChange = async (newColumn: Column) => {
    if (newColumn.id === column.id) return;

    try {
      await changeTaskColumn(task, selectedBoard!.id, column.id, newColumn.id);
      onClose();
    } catch (error) {
      console.log(error);
      toast.error("Could not change task status.");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-4 flex items-center justify-between gap-x-4 md:mb-6">
        <Dialog.Title as="h3" className="text-lg font-bold md:text-xl">
          {task.name}
        </Dialog.Title>
        <TaskOptionsMenu />
      </div>
      <p className="text-sm font-medium text-medium-grey md:text-base">
        {task.description}
      </p>
      {task.subtasks && task.subtasks.length > 0 && (
        <div className="mt-4">
          <p className="text-sm font-bold md:text-base">
            Subtasks {numCompletedSubtasks} of {task.subtasks.length}
          </p>
          <div className="mt-4 flex flex-col gap-y-2">
            {task.subtasks.map((subtask) => (
              <Subtask
                key={subtask.id}
                subtask={subtask}
                onCompletionChanged={handleSubtaskCompletionChange}
              />
            ))}
          </div>
        </div>
      )}
      <Dropdown
        className="mb-3 mt-6"
        label="Current status"
        options={columns}
        selectedOption={column}
        onOptionChange={handleColumnSelectionChange}
        mapOptionToLabel={(option) => option.name}
        mapOptionToId={(option) => option.id}
      />
    </Modal>
  );
}

function Subtask({
  subtask,
  onCompletionChanged,
}: {
  subtask: Subtask;
  onCompletionChanged: (subtaskId: string, completed: boolean) => void;
}) {
  return (
    <div className="rounded-md bg-light-grey p-3 dark:bg-very-dark-grey">
      <label
        className={`flex items-center gap-x-4 text-sm font-bold md:text-base ${
          subtask.completed && "text-medium-grey line-through"
        }`}
      >
        <input
          type="checkbox"
          checked={subtask.completed}
          onChange={(e) => onCompletionChanged(subtask.id, e.target.checked)}
          className="rounded-[4px] text-primary focus:ring-primary"
        />
        {subtask.name}
      </label>
    </div>
  );
}

export default TaskDetailModal;
