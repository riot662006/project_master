import ProjectIcon from "@/app/components/ProjectIcon";
import { allProjectIcons, IconData } from "@/app/utils/AllProjectIcon";
import { useAppContext } from "@/app/utils/AppContext";
import { Apps } from "@mui/icons-material";


const SelectProjectIconSection = () => {
    return (
        <>
            <Header />
            <div className="flex flex-col w-full gap-2">
                <span className="text-xs">Please select the icons you'd like to use from the collection below:</span>
                <IconCollection />
            </div>
            
        </>
    )
}

const Header = () => {
    const { addProjectModalObj } = useAppContext();
    const { setIsOpen } = addProjectModalObj;

    const closeModal = () => setIsOpen(false);

    return (
        <div className="flex w-full items-center">
            <div className="flex items-center gap-2">
                <div className="flex items-center justify-center p-2 rounded-md bg-orange-100">
                    <Apps sx={{ fontSize: "18px" }} className="text-orange-500" />
                </div>
                <span className="font-bold text-md">All Icons</span>
            </div>
        </div>
    )
}

const IconCollection = () => {
    return (
        <ul className="flex flex-wrap w-full overflow-auto h-60 p-4 gap-4 bg-slate-100 overflow-y-auto">
            {
                allProjectIcons.map((iconData: IconData) => <ProjectIcon name={iconData.name} outerClassName="flex item-center justify-center p-2 bg-white rounded-md" innerClassName="text-orange-500"/>)
            }
        </ul>
    )
}
export default SelectProjectIconSection;