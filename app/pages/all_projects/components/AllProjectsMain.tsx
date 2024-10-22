import AllProjectHeader from "./AllProjectHeader"
import AllProjectsOverview from "./AllProjectOverview";
import AllProjectSubHeader from "./AllProjectsSubHeader";
import ProjectList from "./ProjectList";

const AllProjectsMain = () => {
    return (
        <div className="flex h-full w-full px-8 py-10">
            <AllProjectsArea />
            <ProjectsOverviewArea />
        </div>
    )
}

const AllProjectsArea = () => {
    return (
        <div className="flex flex-col h-full w-[78%] px-8 py-10">
            <AllProjectHeader />
            <AllProjectSubHeader />
            <ProjectList />
        </div>
    )
}

const ProjectsOverviewArea = () => {
    return (
        <div className="flex flex-col h-full w-[22%]">
            <AllProjectsOverview />
        </div>
    )
}
export default AllProjectsMain;