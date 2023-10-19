"use client";

import { Menu } from "@headlessui/react";
import OptionsMenu from "./OptionsMenu";

export default function BoardOptionsMenu() {
  return (
    <OptionsMenu>
      <Menu.Item>
        <button>Edit Board</button>
      </Menu.Item>
      <Menu.Item>
        <button className="text-danger">Delete Board</button>
      </Menu.Item>
    </OptionsMenu>
  );
}
