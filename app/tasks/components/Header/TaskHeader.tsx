"use client";

import ProgressBar from "@/components/ProgressBar";
import { useAppDispatch } from "@/hooks/storeHooks";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import {
  Add,
  KeyboardArrowDown,
  Menu,
  Search,
  Splitscreen,
} from "@mui/icons-material";

const TaskHeader = () => {
  const dispatch = useAppDispatch();

  const SearchBar = () => {
    return (
      <div className="flex items-center">
        <div className="flex h-10 w-10 items-center justify-center border-b-2 border-sky-500 outline-none">
          <Search className="text-slate-400" />
        </div>
        <div className="w-[67%] border-b-2 border-slate-200">
          <input
            placeholder="Search a task..."
            className="bg-transparent p-2 text-[14px] outline-none"
          />
        </div>
      </div>
    );
  };

  const NewProjectButton = () => {
    return (
      <div className="flex h-8 cursor-pointer items-center rounded-md bg-sky-500 pl-2 pr-4 text-[14px] text-white max-sm:px-2">
        <Add sx={{ fontSize: "22px" }} />
        <span className="font-medium max-sm:hidden">New Task</span>
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
        <div className="flex items-center gap-4">
          <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-100">
            <Splitscreen sx={{ fontSize: "18px" }} className="text-sky-500" />
          </div>
          <div className="flex flex-col gap-1">
            <div className="flex cursor-pointer items-center gap-2">
              <span className="font-semibold">All Projects</span>
              <span className="rounded-md bg-slate-700 px-1.5 py-0.5 text-sm font-semibold text-white max-sm:hidden">
                6
              </span>
              <KeyboardArrowDown />
            </div>

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ProgressBar
                containerClassName="w-96 h-1 rounded-lg bg-slate-200 max-lg:w-[100%]"
                percentage={20}
              />
              <span className="max-sm:hidden">20% Completed</span>
            </div>
          </div>
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

export default TaskHeader;