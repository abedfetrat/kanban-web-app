import Button from "@/components/Button";
import { useState } from "react";
import AddEditBoardModal from "./AddEditBoardModal";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SidebarToggleStateProvider from "./SidebarToggleStateProvider";

export default function Home() {
  const [shouldShowAddBoardModal, setShouldShowAddBoardModal] = useState(false);
  const [shouldShowEditBoardModal, setShouldShowEditBoardModal] =
    useState(false);

  const handleShowAddBoardModal = () => {
    setShouldShowAddBoardModal(true);
  };

  const handleCloseAddBoardModal = () => {
    setShouldShowAddBoardModal(false);
  };

  const handleShowEditBoardModal = () => {
    setShouldShowEditBoardModal(true);
  };

  const handleCloseEditBoardModal = () => {
    setShouldShowEditBoardModal(false);
  };

  return (
    <SidebarToggleStateProvider>
      <AddEditBoardModal
        isOpen={shouldShowAddBoardModal}
        onClose={handleCloseAddBoardModal}
        mode="add"
      />
      <AddEditBoardModal
        isOpen={shouldShowEditBoardModal}
        onClose={handleCloseEditBoardModal}
        mode="edit"
      />
      <div className="md:flex">
        <Sidebar onShowAddBoardModal={handleShowAddBoardModal} />
        <div className="flex h-screen flex-1 flex-col">
          <Navbar
            onShowAddBoardModal={handleShowAddBoardModal}
            onShowEditBoardModal={handleShowEditBoardModal}
          />
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
