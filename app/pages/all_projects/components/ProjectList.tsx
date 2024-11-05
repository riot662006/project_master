"use client";

import { useAppContext } from "@/app/utils/AppContext";
import ProjectCard from "./ProjectCard";
import ConfirmDeleteProjectModal from "./Modals/ConfirmProjectDeleteModal";
import { ListAlt } from "@mui/icons-material";

const ProjectList = () => {
  const { allProjects } = useAppContext();

  if (allProjects.length == 0) {
    return (
      <div className="flex h-full w-full flex-col items-center justify-center gap-4 text-slate-300">
        <div>
          <ListAlt sx={{ fontSize: "120px" }} />
        </div>
        <div className="flex flex-col items-center gap-4">
          <h2 className="font-semibold text-slate-400">
            No Projects Created Yet...
          </h2>
          <div className="flex flex-col items-center text-sm">
            <p>It looks like you haven&apos;t started any projects yet.</p>
            <p>Create a new project to begin managing your tasks</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex max-h-full w-full flex-wrap gap-4 overflow-y-auto max-sm:grid max-sm:grid-cols-1">
      {allProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
      <ConfirmDeleteProjectModal />
    </div>
  );
};

export default ProjectList;
