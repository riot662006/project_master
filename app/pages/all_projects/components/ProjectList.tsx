"use client";

import { useAppContext } from "@/app/utils/AppContext";
import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  const { allProjects } = useAppContext();

  return (
    <div className="flex max-h-full w-full flex-wrap gap-4 overflow-y-auto max-sm:grid max-sm:grid-cols-1">
      {allProjects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
