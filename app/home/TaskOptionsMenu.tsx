import React from "react";
import OptionsMenu from "./OptionsMenu";
import { Menu } from "@headlessui/react";

/* TODO: add click handlers */
export default function TaskOptionsMenu() {
  return (
    <OptionsMenu>
      <Menu.Item>
        <button>Edit Task</button>
      </Menu.Item>
      <Menu.Item>
        <button className="text-danger">Delete Task</button>
      </Menu.Item>
    </OptionsMenu>
  );
}
