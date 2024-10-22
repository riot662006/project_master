import {KeyboardArrowDown, Splitscreen } from "@mui/icons-material";

const AllProjectSubHeader = () => {
    return (
        <div className="flex justify-between py-8">
            <div>
                {/* Progess Dropdown and Icon */}
                <div className="flex gap-4 items-center">
                    {/* Icon */}
                    <div className="flex items-center justify-center w-8 aspect-square bg-orange-100 rounded-md">
                        <Splitscreen sx={{ fontSize: "18px" }} className="text-orange-500" />
                    </div>
                    {/* Progress Dropdown*/}
                    <ProgressDropDown />
                </div>
            </div>
            <SortBySelector />
        </div>
    )
};

const ProgressDropDown = () => {
    return (
        <div className="flex flex-col gap-1">
            {/* Title Dropdown Selector */}
            <div className="flex items-center gap-2 cursor-pointer">
                <span className="font-semibold">All Projects</span>
                <span className="bg-slate-700 font-semibold text-sm text-white px-1.5 py-0.5 rounded-md">6</span>
                <KeyboardArrowDown/>
            </div>
            {/* Progress on Project */}
            <div className="flex items-center gap-2 text-slate-400 text-xs">
                <SelectedProjectProgressBar />
                {/* Progress Info */}
                <span>20% Completed</span>
            </div>
        </div>
    )
}

const SelectedProjectProgressBar = () => {
    return (
        <div className="w-96 h-1 bg-slate-200 rounded-lg">
            <div className="w-[33%] h-full bg-orange-500 rounded-lg" />
        </div>
    )
}

const SortBySelector = () => {
    return (
        <div className="flex space-x-2 text-[14px] font-semibold items-center">
            <span className="text-slate-300">Sort By</span>
            <div className="flex gap-1 items-center cursor-pointer">
                <span className="text-slate-800">Recent Projects</span>
                <KeyboardArrowDown />
            </div>
        </div>
    )
}

export default AllProjectSubHeader;