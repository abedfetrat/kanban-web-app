import React from "react";
import Modal from "./Modal";
import Input from "@/components/Input";

export default function AddBoardModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Add New Board">
      <Input placeholder="e.g. Web Design" />
    </Modal>
  );
}
