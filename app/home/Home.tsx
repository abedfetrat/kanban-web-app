import Button from "@/components/Button";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SidebarToggleStateProvider from "./SidebarToggleStateProvider";
import AddBoardModal from "./AddBoardModal";
import { useState } from "react";

export default function Home() {
  const [showAddBoardModal, setShowAddBoardModal] = useState(false);

  const toggleAddBoardModal = () => {
    setShowAddBoardModal((prev) => !prev);
  };

  return (
    <SidebarToggleStateProvider>
      <AddBoardModal isOpen={showAddBoardModal} onClose={toggleAddBoardModal} />
      <div className="md:flex">
        <Sidebar onShowAddBoardModal={toggleAddBoardModal} />
        <div className="flex h-screen flex-1 flex-col">
          <Navbar onShowAddBoardModal={toggleAddBoardModal} />
          <main className="grid flex-1 place-items-center px-4 pt-6 md:px-6">
            <section className="text-center">
              <p className="text-lg font-bold text-medium-grey">
                This board is empty. Create a new column to get started.
              </p>
              <Button size="large" className="mt-6" color="primary">
                + Add New Column
              </Button>
            </section>
          </main>
        </div>
      </div>
    </SidebarToggleStateProvider>
  );
}
