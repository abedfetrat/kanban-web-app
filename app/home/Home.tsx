import { useState } from "react";
import AddEditBoardModal from "./AddEditBoardModal";
import AddEditTaskModal from "./AddEditTaskModal";
import DeleteBoardModal from "./DeleteBoardModal";
import Sidebar from "./Sidebar";
import Main from "./main/Main";
import Navbar from "./navbar/Navbar";
import SelectedBoardProvider from "./providers/SelectedBoardProvider";
import SidebarToggleStateProvider from "./providers/SidebarToggleStateProvider";
import { ModeType } from "./components/Modal";

type AddEditModalState = {
  mode: ModeType;
  open: boolean;
};

export default function Home() {
  const [shouldShowAddBoardModal, setShouldShowAddBoardModal] = useState(false);
  const [shouldShowEditBoardModal, setShouldShowEditBoardModal] =
    useState(false);
  const [shouldShowDeleteBoardModal, setShouldShowDeleteBoardModal] =
    useState(false);
  const [addEditTaskModalState, setAddEditTaskModalState] =
    useState<AddEditModalState>({
      mode: "add",
      open: false,
    });

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
  // Toggle Add/Edit Task Modal
  const handleShowAddEditTaskModal = (mode: ModeType) => {
    setAddEditTaskModalState({ mode: mode, open: true });
  };
  const handleCloseAddEditTaskModal = () => {
    setAddEditTaskModalState({ mode: "add", open: false });
  };

  return (
    <SidebarToggleStateProvider>
      <SelectedBoardProvider>
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
        <AddEditTaskModal
          mode={addEditTaskModalState.mode}
          isOpen={addEditTaskModalState.open}
          onClose={handleCloseAddEditTaskModal}
        />
        <div className="md:flex">
          <Sidebar onShowAddBoardModal={handleShowAddBoardModal} />
          <div className="flex h-screen w-full flex-col overflow-hidden">
            <Navbar
              onShowAddBoardModal={handleShowAddBoardModal}
              onShowEditBoardModal={handleShowEditBoardModal}
              onShowDeleteBoardModal={handleShowDeleteBoardModal}
              onShowAddEditTaskModal={handleShowAddEditTaskModal}
            />
            <Main
              onShowAddBoardModal={handleShowAddBoardModal}
              onShowEditBoardModal={handleShowEditBoardModal}
            />
          </div>
        </div>
      </SelectedBoardProvider>
    </SidebarToggleStateProvider>
  );
}
