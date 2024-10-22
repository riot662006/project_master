import { Add, Search } from "@mui/icons-material";

const AllTasksHeader = () => {
    return (
        <div className="flex justify-between">
            <SearchBar />
            <NewProjectButton />
        </div>
    )
};

const SearchBar = () => {
    return (
        <div className="flex items-center">
            <div className="border-b-2 border-orange-500 h-10 w-10 justify-center flex items-center outline-none">
                <Search className="text-slate-400"/>
            </div>
            <div className="border-b-2 border-slate-200">
                <input
                    placeholder="Search a task..."
                    className="p-2 bg-transparent text-[14px] outline-none"
                />
            </div>
        </div>
    )
}

const NewProjectButton = () => {
    return (
        <div className="h-8 rounded-md bg-orange-500 text-white pl-2 pr-4 text-[14px] flex items-center">
            <Add sx={{fontSize: "22px"}}/>
            <span className="font-medium">New Task</span>
        </div>
    )
    
}

export default AllTasksHeader;