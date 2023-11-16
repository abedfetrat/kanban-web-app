import { useModal } from "@/app/providers/ModalProvider";
import { Menu } from "@headlessui/react";
import AddEditBoardModal from "../AddEditBoardModal";
import DeleteBoardModal from "../DeleteBoardModal";
import OptionsMenu from "../components/OptionsMenu";

export default function BoardOptionsMenu() {
  const { openModal } = useModal();
  return (
    <OptionsMenu>
      <Menu.Item>
        <button
          className="w-full text-start"
          onClick={() => openModal(AddEditBoardModal, { mode: "edit" })}
        >
          Edit Board
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="w-full text-start text-danger"
          onClick={() => openModal(DeleteBoardModal, {})}
        >
          Delete Board
        </button>
      </Menu.Item>
    </OptionsMenu>
  );
}
