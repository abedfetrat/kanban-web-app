import Button from "@/components/Button";
import Input from "@/components/Input";
import Image from "next/image";
import { SubmitHandler, useFieldArray, useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { createNewBoard } from "@/../firebase/db";
import Modal from "./Modal";

enum MODES {
  add = "add",
  edit = "edit",
}

type AddEditBoardModalType = {
  isOpen: boolean;
  onClose: () => void;
  mode: keyof typeof MODES;
};

type Inputs = {
  boardName: string;
  boardColumns: {
    columnName: string;
  }[];
};

export default function AddEditBoardModal({
  isOpen,
  onClose,
  mode,
}: AddEditBoardModalType) {
  const {
    control,
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<Inputs>({
    defaultValues: {
      boardName: "",
      boardColumns: [{ columnName: "" }],
    },
  });
  const { fields, append, remove } = useFieldArray({
    name: "boardColumns",
    control,
  });

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    if (mode === MODES.add) {
      try {
        createNewBoard(
          data.boardName,
          data.boardColumns.map((col) => col.columnName),
        );
      } catch (error) {
        console.log(error);
        toast.error("Error creating new board.");
      }
    } else {
     // TODO: Edit board
    }
    reset();
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={mode === MODES.add ? "Add New Board" : "Edit Board"}
    >
      <form onSubmit={handleSubmit(onSubmit)}>
        <Input
          placeholder="e.g. Web Design"
          label="Board Name"
          error={errors?.boardName?.message}
          {...register("boardName", { required: "Please enter a board name." })}
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
                    error={errors?.boardColumns?.[index]?.columnName?.message}
                    {...register(`boardColumns.${index}.columnName` as const, {
                      required: "Please enter a column name.",
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
            onClick={() => append({ columnName: "" })}
          >
            + Add New Column
          </Button>
        </div>
        <Button type="submit" color="primary" size="large" className="w-full">
          {mode === MODES.add ? "Create New Board" : "Save Changes"}
        </Button>
      </form>
    </Modal>
  );
}
