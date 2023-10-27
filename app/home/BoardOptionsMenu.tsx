"use client";

import { Menu } from "@headlessui/react";
import OptionsMenu from "./OptionsMenu";

export default function BoardOptionsMenu({
  onShowEditBoardModal,
  onShowDeleteBoardModal,
}: {
  onShowEditBoardModal: () => void;
  onShowDeleteBoardModal: () => void;
}) {
  return (
    <OptionsMenu>
      <Menu.Item>
        <button className="w-full text-start" onClick={onShowEditBoardModal}>
          Edit Board
        </button>
      </Menu.Item>
      <Menu.Item>
        <button
          className="w-full text-start text-danger"
          onClick={onShowDeleteBoardModal}
        >
          Delete Board
        </button>
      </Menu.Item>
    </OptionsMenu>
  );
}
