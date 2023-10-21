"use client";

import { Menu } from "@headlessui/react";
import OptionsMenu from "./OptionsMenu";

export default function BoardOptionsMenu({
  onShowEditBoardModal,
}: {
  onShowEditBoardModal: () => void;
}) {
  return (
    <OptionsMenu>
      <Menu.Item>
        <button className="w-full text-start" onClick={onShowEditBoardModal}>
          Edit Board
        </button>
      </Menu.Item>
      <Menu.Item>
        <button className="w-full text-start text-danger">Delete Board</button>
      </Menu.Item>
    </OptionsMenu>
  );
}
