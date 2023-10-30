import Button from "@/app/components/Button";
import { Dialog } from "@headlessui/react";
import toast from "react-hot-toast";
import { deleteBoard } from "@/services/db";
import Modal from "./components/Modal";
import { useSelectedBoard } from "./providers/SelectedBoardProvider";

export default function DeleteBoardModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { selectedBoard } = useSelectedBoard();

  const handleDelete = () => {
    if (!selectedBoard) return;
    try {
      deleteBoard(selectedBoard.id);
      onClose();
    } catch (error) {
      console.log(error);
      toast("Error deleting board");
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div className="mb-4 md:mb-6">
        <Dialog.Title
          as="h3"
          className="text-lg font-bold text-danger md:text-xl"
        >
          Delete this board?
        </Dialog.Title>
      </div>
      <p className="font-medium text-medium-grey">
        Are you sure you want to delete the `{selectedBoard?.name || ""}` board?
        This action will remove all columns and tasks and cannot be reversed.
      </p>
      <div className="mt-6 flex flex-col gap-4 md:flex-row">
        <Button
          color="danger"
          size="large"
          className="w-full"
          onClick={handleDelete}
        >
          Delete
        </Button>
        <Button
          color="secondary"
          size="large"
          className="w-full"
          onClick={onClose}
        >
          Cancel
        </Button>
      </div>
    </Modal>
  );
}
