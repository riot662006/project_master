import CompletedProjectsSection from "./CompletedProjectsSection";
import ProjectHeader from "../Header/ProjectHeader";
import ProjectList from "../Lists/ProjectList";
import AddProjectModal from "../Modals/AddProjectModal";
import ConfirmDeleteModal from "../../../../components/Modals/ConfirmProjectDeleteModal";
import AddTaskModal from "@/app/tasks/components/Modals/AddTaskModal";

const ProjectsSection = () => {
  return (
    <div className="flex h-full w-full px-8 py-10">
      <div className="flex h-full w-[78%] flex-col px-8 py-10 max-lg:w-full max-lg:px-0">
        <ProjectHeader />
        <ProjectList />
      </div>
      <div className="flex h-full w-[22%] flex-col max-lg:hidden">
        <CompletedProjectsSection />
      </div>
      <AddProjectModal />
      <AddTaskModal />
      <ConfirmDeleteModal />
    </div>
  );
};

export default ProjectsSection;
