"use client";

import { Add, KeyboardArrowDown, Menu, Search } from "@mui/icons-material";

import { useAppDispatch } from "@/hooks/storeHooks";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import { openAddProjectModal } from "@/store/slices/addProjectModalSlice";

const AllProjectHeader = () => {
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
        </div>
      </div>
      <div className="flex items-center justify-between py-8">
        <div>
          <span className="text-xl font-bold">My Projects</span>
        </div>
        <div className="flex items-center gap-2 text-[14px] font-semibold max-sm:flex-col max-sm:items-start">
          <span className="flex items-center text-slate-200">Sort By</span>
          <div className="flex cursor-pointer items-center gap-1">
            <span className="flex items-center text-slate-800">
              Recent Projects
            </span>
            <KeyboardArrowDown />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllProjectHeader;
