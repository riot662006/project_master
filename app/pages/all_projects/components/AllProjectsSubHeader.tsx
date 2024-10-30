import { KeyboardArrowDown } from "@mui/icons-material";

const AllProjectSubHeader = () => {
  return (
    <div className="flex items-center justify-between py-8">
      <div>
        <span className="text-xl font-bold">My Projects</span>
      </div>
      <SortBySelector />
    </div>
  );
};

const SortBySelector = () => {
  return (
    <div className="flex items-center gap-2 text-[14px] font-semibold max-sm:flex-col max-sm:items-start">
      <span className="flex items-center text-slate-200">Sort By</span>
      <div className="flex cursor-pointer items-center gap-1">
        <span className="flex items-center text-slate-800">
          Recent Projects
        </span>
        <KeyboardArrowDown />
      </div>
    </div>
  );
};

export default AllProjectSubHeader;
