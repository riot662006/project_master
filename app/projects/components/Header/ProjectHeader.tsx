"use client";

import { Add, BorderAll, Menu, Search } from "@mui/icons-material";

import { useAppDispatch } from "@/hooks/storeHooks";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import { openAddProjectModal } from "@/store/slices/addProjectModalSlice";
import AddProjectModal from "../Modals/AddProjectModal";
import ProjectSortingOptions from "../DropDowns/ProjectSortingOptions";

const ProjectHeader = () => {
  const dispatch = useAppDispatch();

  const SearchBar = () => {
    return (
      <div className="flex items-center">
        <div className="flex h-10 w-10 items-center justify-center border-b-2 border-sky-500 outline-none">
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
        className="flex h-8 cursor-pointer items-center rounded-md bg-sky-500 pl-2 pr-4 text-xs text-white hover:bg-sky-600 max-sm:px-2"
        onClick={() => dispatch(openAddProjectModal())}
      >
        <Add sx={{ fontSize: "22px" }} />
        <span className="font-medium max-sm:hidden">New Project</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <SearchBar />
        <div className="flex items-center gap-2">
          <NewProjectButton />
          <button onClick={() => dispatch(toggleSidebar(true))}>
            <Menu className="hidden cursor-pointer text-slate-400 max-sm:block" />
          </button>
          <AddProjectModal />
        </div>
      </div>
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center gap-4">
          <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-100">
            <BorderAll sx={{ fontSize: "18px" }} className="text-sky-500" />
          </div>
          <div>
            <span className="text-xl font-bold">My Projects</span>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 text-[14px] max-sm:flex-col max-sm:items-end">
          <span className="flex items-center font-semibold text-slate-300">
            Sort By
          </span>
          <ProjectSortingOptions />
        </div>
      </div>
    </div>
  );
};

export default ProjectHeader;
