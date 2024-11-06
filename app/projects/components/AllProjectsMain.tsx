import AllProjectHeader from "./AllProjectHeader";
import AllProjectsOverview from "./AllProjectOverview";
import AllProjectSubHeader from "./AllProjectsSubHeader";
import ProjectList from "./ProjectList";

const AllProjectsMain = () => {
  return (
    <div className="flex h-full w-full px-8 py-10">
      <AllProjectsArea />
      <ProjectsOverviewArea />
    </div>
  );
};

const AllProjectsArea = () => {
  return (
    <div className="flex h-full w-[78%] flex-col px-8 py-10 max-lg:w-full max-lg:px-0">
      <AllProjectHeader />
      <AllProjectSubHeader />
      <ProjectList />
    </div>
  );
};

const ProjectsOverviewArea = () => {
  return (
    <div className="flex h-full w-[22%] flex-col max-lg:hidden">
      <AllProjectsOverview />
    </div>
  );
};
export default AllProjectsMain;
