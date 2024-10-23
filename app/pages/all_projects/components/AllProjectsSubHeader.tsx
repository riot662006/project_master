import { KeyboardArrowDown } from "@mui/icons-material";

const AllProjectSubHeader = () => {
    return (
        <div className="flex items-center justify-between py-8">
            <div>
                <span className="font-bold text-xl">My Projects</span>
            </div>
            <SortBySelector />
        </div>
    )
};

const SortBySelector = () => {
    return (
        <div className="flex gap-2 text-[14px] font-semibold items-center max-sm:flex-col max-sm:items-start">
            <span className="flex items-center text-slate-200">Sort By</span>
            <div className="flex gap-1 items-center cursor-pointer">
                <span className="flex items-center text-slate-800 ">Recent Projects</span>
                <KeyboardArrowDown />
            </div>
        </div>
    )
}

export default AllProjectSubHeader;