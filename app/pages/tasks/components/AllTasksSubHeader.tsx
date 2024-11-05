import { KeyboardArrowDown, Splitscreen } from "@mui/icons-material";

const AllTasksSubHeader = () => {
  return (
    <div className="flex items-center justify-between py-8">
      <div>
        {/* Progess Dropdown and Icon */}
        <div className="flex items-center gap-4">
          {/* Icon */}
          <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-100">
            <Splitscreen
              sx={{ fontSize: "18px" }}
              className="text-sky-500"
            />
          </div>
          {/* Progress Dropdown*/}
          <ProgressDropDown />
        </div>
      </div>
      <SortBySelector />
    </div>
  );
};

const ProgressDropDown = () => {
  return (
    <div className="flex flex-col gap-1">
      {/* Title Dropdown Selector */}
      <div className="flex cursor-pointer items-center gap-2">
        <span className="font-semibold">All Projects</span>
        <span className="rounded-md bg-slate-700 px-1.5 py-0.5 text-sm font-semibold text-white max-sm:hidden">
          6
        </span>
        <KeyboardArrowDown />
      </div>
      {/* Progress on Project */}
      <div className="flex items-center gap-2 text-xs text-slate-400">
        <SelectedProjectProgressBar />
        {/* Progress Info */}
        <span className="max-sm:hidden">20% Completed</span>
      </div>
    </div>
  );
};

const SelectedProjectProgressBar = () => {
  return (
    <div className="h-1 w-96 rounded-lg bg-slate-200 max-lg:w-[100%]">
      <div className="h-full w-[33%] rounded-lg bg-sky-500" />
    </div>
  );
};

const SortBySelector = () => {
  return (
    <div className="flex items-center gap-1 text-[14px] font-semibold max-sm:flex-col max-sm:items-start max-sm:text-[10px]">
      <span className="flex items-center text-slate-300">Sort By</span>
      <div className="flex cursor-pointer items-center gap-1">
        <span className="flex items-center text-slate-800">
          Recent Projects
        </span>
        <KeyboardArrowDown />
      </div>
    </div>
  );
};

export default AllTasksSubHeader;
