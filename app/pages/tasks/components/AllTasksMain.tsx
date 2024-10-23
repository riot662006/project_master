import AllTasksHeader from "./AllTasksHeader";
import AllTasksSubHeader from "./AllTasksSubHeader";
import TasksPanel from "./TasksPanel";

const AllTasksMain = () => {
    return (
        <div className="flex h-full w-full px-8 py-10">
            <AllTasksArea />
        </div>
    )
}

const AllTasksArea = () => {
    return (
        <div className="flex flex-col h-full w-full px-8 py-10 max-lg:px-0">
            <AllTasksHeader />
            <AllTasksSubHeader />
            <TasksPanel />
        </div>
    )
}

export default AllTasksMain;