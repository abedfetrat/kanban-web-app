import Button from "@/components/Button";
import { useState } from "react";
import AddEditBoardModal from "./AddEditBoardModal";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";
import SidebarToggleStateProvider from "./SidebarToggleStateProvider";
import BoardsProvider from "./providers/BoardsProvider";
import ColumnsProvider from "./providers/ColumnsProvider";
import SelectedBoardProvider from "./providers/SelectedBoardProvider";
import DeleteBoardModal from "./DeleteBoardModal";

export default function Home() {
  const [shouldShowAddBoardModal, setShouldShowAddBoardModal] = useState(false);
  const [shouldShowEditBoardModal, setShouldShowEditBoardModal] =
    useState(false);
  const [shouldShowDeleteBoardModal, setShouldShowDeleteBoardModal] =
    useState(false);

  // Toggle Add Board Modal
  const handleShowAddBoardModal = () => {
    setShouldShowAddBoardModal(true);
  };
  const handleCloseAddBoardModal = () => {
    setShouldShowAddBoardModal(false);
  };
  // Toggle Edit Board Modal
  const handleShowEditBoardModal = () => {
    setShouldShowEditBoardModal(true);
  };
  const handleCloseEditBoardModal = () => {
    setShouldShowEditBoardModal(false);
  };
  // Toggle Delete Board Modal
  const handleShowDeleteBoardModal = () => {
    setShouldShowDeleteBoardModal(true);
  };
  const handleCloseDeleteBoardModal = () => {
    setShouldShowDeleteBoardModal(false);
  };

  return (
    <SidebarToggleStateProvider>
      <BoardsProvider>
        <SelectedBoardProvider>
          <ColumnsProvider>
            <AddEditBoardModal
              mode="add"
              isOpen={shouldShowAddBoardModal}
              onClose={handleCloseAddBoardModal}
            />
            <AddEditBoardModal
              mode="edit"
              isOpen={shouldShowEditBoardModal}
              onClose={handleCloseEditBoardModal}
            />
            <DeleteBoardModal
              isOpen={shouldShowDeleteBoardModal}
              onClose={handleCloseDeleteBoardModal}
            />
            <div className="md:flex">
              <Sidebar onShowAddBoardModal={handleShowAddBoardModal} />
              <div className="flex h-screen flex-1 flex-col">
                <Navbar
                  onShowAddBoardModal={handleShowAddBoardModal}
                  onShowEditBoardModal={handleShowEditBoardModal}
                  onShowDeleteBoardModal={handleShowDeleteBoardModal}
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
          </ColumnsProvider>
        </SelectedBoardProvider>
      </BoardsProvider>
    </SidebarToggleStateProvider>
  );
}
