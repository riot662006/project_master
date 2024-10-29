"use client"

import { Add, Menu, Search } from "@mui/icons-material";
import AddProjectModal from "./AddProjectModal";
import { useAppContext } from "@/app/utils/AppContext";

const AllProjectHeader = () => {
    const { sidebarObj } = useAppContext();
    const openSidebar = () => sidebarObj.setIsOpen(true);

    return (
        <div className="flex justify-between items-center">
            <SearchBar />
            <div className="flex items-center gap-2">
                <NewProjectButton />
                <button onClick={openSidebar}>
                    <Menu className="text-slate-400 cursor-pointer hidden max-sm:block" />
                </button>
                <AddProjectModal />
            </div>
        </div>
    )
};

const SearchBar = () => {
    return (
        <div className="flex items-center">
            <div className="border-b-2 border-orange-500 h-10 w-10 justify-center flex items-center outline-none">
                <Search className="text-slate-400" />
            </div>
            <div className="border-b-2 border-slate-200 h-full w-[67%]">
                <input
                    placeholder="Search a project..."
                    className="p-2 bg-transparent text-sm outline-none"
                />
            </div>

        </div>
    )
}

const NewProjectButton = () => {
    const { addProjectModalObj } = useAppContext();
    const openAddProjectModal = () => addProjectModalObj.setIsOpen(true);

    return (
        <div className="h-8 rounded-md bg-orange-500 text-white pl-2 pr-4 text-xs flex items-center cursor-pointer max-sm:px-2" onClick={openAddProjectModal}>
            <Add sx={{ fontSize: "22px" }} />
            <span className="font-medium max-sm:hidden">New Project</span>
        </div>
    )

}

export default AllProjectHeader;