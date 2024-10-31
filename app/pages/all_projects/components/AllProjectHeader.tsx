"use client";

import { Add, Menu, Search } from "@mui/icons-material";
import AddProjectModal from "./AddProjectModal";
import { useAppContext } from "@/app/utils/AppContext";

const AllProjectHeader = () => {
  const { sidebarObj, addProjectModalObj } = useAppContext();

  const openSidebar = () => sidebarObj.setIsOpen(true);
  const openAddProjectModal = () => addProjectModalObj.setIsOpen(true);

  const SearchBar = () => {
    return (
      <div className="flex items-center">
        <div className="flex h-10 w-10 items-center justify-center border-b-2 border-orange-500 outline-none">
          <Search className="text-slate-400" />
        </div>
        <div className="h-full w-[67%] border-b-2 border-slate-200">
          <input
            placeholder="Search a project..."
            className="bg-transparent p-2 text-sm outline-none"
          />
        </div>
      </div>
    );
  };

  const NewProjectButton = () => {
    return (
      <div
        className="flex h-8 cursor-pointer items-center rounded-md bg-orange-500 pl-2 pr-4 text-xs text-white max-sm:px-2"
        onClick={openAddProjectModal}
      >
        <Add sx={{ fontSize: "22px" }} />
        <span className="font-medium max-sm:hidden">New Project</span>
      </div>
    );
  };

  return (
    <div className="flex items-center justify-between">
      <SearchBar />
      <div className="flex items-center gap-2">
        <NewProjectButton />
        <button onClick={openSidebar}>
          <Menu className="hidden cursor-pointer text-slate-400 max-sm:block" />
        </button>
        <AddProjectModal />
      </div>
    </div>
  );
};

export default AllProjectHeader;
