import { MoreVert, Splitscreen } from "@mui/icons-material"
import Circle from "@mui/icons-material/Circle"

const ProjectCard = () => {
    return (
        <div className="flex flex-col w-80 bg-white px-10 p-7 gap-8">
            <ProjectCardHeader />
            <ProjectCardBody />
            <ProjectCardFooter />
        </div>
    )
}

const ProjectCardHeader = () => {
    return (
        <div className="flex justify-between items-center">
            {/* Title and Icon */}
            <div className="flex gap-3 items-center">
                {/* Icon */}
                <div className="flex items-center justify-center w-10 aspect-square bg-orange-500 rounded-md">
                    <Splitscreen sx={{ fontSize: "20px" }} className="text-white" />
                </div>
                {/* Title */}
                <div className="flex flex-col">
                    <span className="text-m font-bold">Project Title</span>
                    <span className="text-[12px] text-slate-400">2 days ago</span>
                </div>
            </div>
            {/* Options */}
            <div>
                <MoreVert fontSize="small" className="text-slate-400 cursor-pointer" />
            </div>
        </div>
    )
}

const ProjectCardBody = () => {
    return (
        <ul className="flex flex-col text-slate-400 text-sm ml-2 gap-4">
            <ProjectCardBodyItem />
            <ProjectCardBodyItem />
        </ul>
    )
}

const ProjectCardBodyItem = () => {
    return (
        <li className="flex gap-2 items-center">
            <Circle sx={{ fontSize: "8px" }} />
            <span >Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
        </li>
    )
}

const ProjectCardFooter = () => {
    return (
        <div className="flex flex-col gap-4">
            <ProjectProgressBar />
            <div className="flex items-center justify-between text-xs">
                <span className="text-slate-400">On Progress</span>
                <span className="font-semibold">33%</span>
            </div>
        </div>
    )
}

const ProjectProgressBar = () => {
    return (
        <div className="w-full h-2 bg-slate-100 rounded-lg">
            <div className="w-[33%] h-2 bg-orange-500 rounded-lg" />
        </div>
    )
}

export default ProjectCard;