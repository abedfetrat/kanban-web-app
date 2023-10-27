import { createNewBoard, editBoard } from "@/../firebase/db";
import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { useEffect } from "react";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import Modal from "./components/Modal";
import { useColumns } from "./providers/ColumnsProvider";
import { useSelectedBoard } from "./providers/SelectedBoardProvider";

type AddEditBoardModalType = {
  mode: "add" | "edit";
  isOpen: boolean;
  onClose: () => void;
};

type Inputs = {
  boardName: string;
  boardColumns: {
    columnName: string;
    columnId: string;
  }[];
};

export default function AddEditBoardModal({
  mode,
  isOpen,
  onClose,
}: AddEditBoardModalType) {
  const { selectedBoard, selectBoard } = useSelectedBoard();
  const { columns } = useColumns();

  const {
    control,
    register,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      boardName: "",
      boardColumns: [{ columnName: "", columnId: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "boardColumns",
    control,
  });

  useEffect(() => {
    if (mode === "edit" && selectedBoard) {
      if (columns) {
        reset({
          boardName: selectedBoard.name,
          boardColumns: columns.map((col) => ({
            columnId: col.id,
            columnName: col.name,
          })),
        });
      } else {
        reset({ boardName: selectedBoard.name });
      }
    }
  }, [mode, selectedBoard, columns, reset]);

  const handleAdd = async (data: Inputs) => {
    try {
      const boardId = await createNewBoard(
        data.boardName.trim(),
        data.boardColumns.map((col) => col.columnName.trim()),
      );
      selectBoard(boardId);
    } catch (error) {
      console.log(error);
      toast.error("Error creating new board.");
    }
  };

  const handleEdit = (data: Inputs) => {
    try {
      const newColumns = data.boardColumns.map((col) => ({
        id: col.columnId,
        name: col.columnName.trim(),
      }));
      editBoard(selectedBoard!, data.boardName.trim(), newColumns, columns);
    } catch (error) {
      console.log(error);
      toast.error("Error editing board.");
    }
  };

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (mode === "add") {
      handleAdd(data);
      reset();
    } else {
      handleEdit(data);
    }
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === "add" ? "Add New Board" : "Edit Board"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="e.g. Web Design"
          label="Board Name"
          error={errors?.boardName && "Please enter a board name."}
          {...register("boardName", {
            required: true,
            pattern: /^\s*.*\S.*\s*$/,
          })}
        />
        <div className="mb-6 mt-4">
          <p className="mb-2 text-sm font-bold md:text-base">Board Columns</p>
          <div className="mb-4 flex flex-col gap-y-3">
            {fields.map((field, index) => {
              return (
                <div key={field.id} className="flex items-start gap-x-4">
                  <Input
                    placeholder="Column Name"
                    wrapperClassName="w-full"
                    className="w-full"
                    error={
                      errors?.boardColumns?.[index]?.columnName &&
                      "Please enter a column name."
                    }
                    {...register(`boardColumns.${index}.columnName` as const, {
                      required: true,
                      pattern: /^\s*.*\S.*\s*$/,
                    })}
                  />
                  <button
                    className="mt-4 min-w-[15px]"
                    title="Delete Column"
                    onClick={() => remove(index)}
                  >
                    <Image
                      src="/images/icon-cross.svg"
                      width={15}
                      height={15}
                      alt=""
                    />
                  </button>
                </div>
              );
            })}
          </div>
          <Button
            type="button"
            color="secondary"
            size="large"
            className="w-full"
            onClick={() => append({ columnName: "", columnId: "" })}
          >
            + Add New Column
          </Button>
        </div>
        <Button type="submit" color="primary" size="large" className="w-full">
          {mode === "add" ? "Create New Board" : "Save Changes"}
        </Button>
      </form>
    </Modal>
  );
}
