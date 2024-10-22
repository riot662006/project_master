import AllTasksHeader from "./AllTasksHeader";
import AllTasksSubHeader from "./AllTasksSubHeader";

const AllTasksMain = () => {
    return (
        <div className="flex h-full w-full px-8 py-10">
            <AllTasksArea />
        </div>
    )
}

const AllTasksArea = () => {
    return (
        <div className="flex flex-col h-full w-full px-8 py-10">
            <AllTasksHeader />
            <AllTasksSubHeader />
        </div>
    )
}

export default AllTasksMain;