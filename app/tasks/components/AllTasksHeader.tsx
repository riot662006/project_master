"use client";

import { useAppContext } from "@/utils/AppContext";
import { Add, Menu, Search } from "@mui/icons-material";

const AllTasksHeader = () => {
  const { sidebarObj } = useAppContext();
  const { setIsOpen } = sidebarObj;

  const openSidebar = () => setIsOpen(true);

  return (
    <div className="flex items-center justify-between">
      <SearchBar />
      <div className="flex items-center gap-2">
        <NewProjectButton />
        <button onClick={openSidebar}>
          <Menu className="hidden cursor-pointer text-slate-400 max-sm:block" />
        </button>
      </div>
    </div>
  );
};

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

export default AllTasksHeader;
