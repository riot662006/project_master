import { Cached, CheckBox, DeleteOutline, EditOutlined, List } from "@mui/icons-material"

const TasksPanel = () => {
    return (
        <div className="flex flex-col pl-12 max-sm:pl-0">
            <TasksFilter />
            <TaskList />
        </div>
    )
}

const TasksFilter = () => {
    return (
        <div className="flex gap-8 items-center py-8">
            <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="text-orange-400">On Going Tasks</span>
                <span className="bg-orange-500 text-white px-2 py-0.5 rounded-md">7</span>
            </div>

            <div className="flex items-center gap-2 text-xs font-semibold">
                <span className="text-slate-300">Completed Tasks</span>
                <span className="bg-slate-200 text-slate-400 px-2 py-0.5 rounded-md">7</span>
            </div>
        </div>
    )
}

const TaskList = () => {
    return (
        <ul className="flex flex-col gap-4 w-full">
            <TaskItem />
            <TaskItem />
        </ul>
    )
}

const TaskItem = () => {
    return (
        <li className="flex items-center w-full gap-4">
            <CheckBox />
            <div className="flex items-center w-full p-4 gap-2 bg-white rounded-r-xl">
                {/* Icon */}
                <div className="flex items-center justify-center bg-orange-100 text-orange-500 w-8 aspect-square rounded-md">
                    <List sx={{ fontSize: "18px" }} />
                </div>
                {/* Task Titles */}
                <div className="flex flex-col gap-1 flex-grow">
                    <p className="flex items-center text-sm font-bold max-w-[60%]">Create the UI Design of the task</p>
                    <p className="text-xs text-slate-400">Project</p>
                </div>
                <div className="flex items-center">
                    {/* Progress */}
                    <div className="flex justify-center items-center w-32 gap-1 text-slate-400 max-sm:hidden">
                        <Cached fontSize="small" />
                        <span className="font-medium text-sm">In Progress</span>
                    </div>
                    {/* Priority */}
                    <div className="flex justify-center items-center w-20 gap-1 text-slate-400 max-sm:hidden">
                        <div className="w-2 aspect-square rounded-full bg-green-700" />
                        <span className="font-medium text-sm">Low</span>
                    </div>
                </div>
                <div className="flex items-center gap-2 max-lg:flex-col">
                    {/* Edit */}
                    <div className="flex items-center justify-center bg-orange-100 text-orange-500 w-8 aspect-square rounded-md">
                        <EditOutlined sx={{ fontSize: "18px" }} />
                    </div>

                    {/* Trash */}
                    <div className="flex items-center justify-center bg-slate-200 text-slate-600 w-8 aspect-square rounded-md">
                        <DeleteOutline sx={{ fontSize: "18px" }} />
                    </div>
                </div>
            </div>
        </li>
    )
}

export default TasksPanel;