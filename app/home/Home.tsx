import { useState } from "react";
import AddEditBoardModal from "./AddEditBoardModal";
import DeleteBoardModal from "./DeleteBoardModal";
import Main from "./Main";
import Sidebar from "./Sidebar";
import Navbar from "./navbar/Navbar";
import BoardsProvider from "./providers/BoardsProvider";
import ColumnsProvider from "./providers/ColumnsProvider";
import SelectedBoardProvider from "./providers/SelectedBoardProvider";
import SidebarToggleStateProvider from "./providers/SidebarToggleStateProvider";

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
                <Main />
              </div>
            </div>
          </ColumnsProvider>
        </SelectedBoardProvider>
      </BoardsProvider>
    </SidebarToggleStateProvider>
  );
}
