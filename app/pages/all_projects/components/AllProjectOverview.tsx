import Splitscreen from "@mui/icons-material/Splitscreen"

const AllProjectsOverview = () => {
    return (
        <div className="flex flex-col items-center w-full h-full p-8 gap-6 rounded-2xl bg-white">
            <h2 className="font-bold">Projects Completed</h2>
            <ProjectProgressCircle />

            {/* Labels */}
            <div className="flex flex-col gap-1 items-center">
                <p className="text-sm font-semibold">3 Completed</p>
                <p className="text-[10px] text-slate-400">20 Tasks done</p>
            </div>

            <ProjectsList />
        </div>
    )
}

const ProjectProgressCircle = () => {
    return (
        <div className="flex justify-center items-center">
            <div className="w-40 h-40 bg-slate-100 rounded-full flex items-center justify-center">
                <div
                    className="w-[86%] flex justify-center items-center h-[86%] bg-white rounded-full"
                >
                    <span className="text-xl font-semibold text-orange-500">90%</span>
                </div>
            </div>
        </div>
    )
}

const ProjectsList = () => {
    return (
        <ul className="flex flex-col w-full items-center gap-5 overflow-auto">
            <SingleProject />
            <hr className="w-[80%]" />
            <SingleProject />
            <hr className="w-[80%]" />
            <SingleProject />
            <hr className="w-[80%]" />
            <SingleProject />
        </ul>
    )
}

const SingleProject = () => {
    return (
        <li className="flex w-full gap-2">
            <div className="flex items-center justify-center w-8 aspect-square bg-orange-500 rounded-md">
                <Splitscreen sx={{ fontSize: "18px" }} className="text-white" />
            </div>
            <div className="flex flex-col">
                <p className="text-xs font-semibold">Project 1</p>
                <p className="text-[10px] text-slate-400">3 Tasks</p>
            </div>
        </li>
    )
}

export default AllProjectsOverview;