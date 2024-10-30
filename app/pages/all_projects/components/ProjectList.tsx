import ProjectCard from "./ProjectCard";

const ProjectList = () => {
  return (
    <div className="flex max-h-full w-full flex-wrap gap-4 overflow-y-auto max-sm:grid max-sm:grid-cols-1">
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
      <ProjectCard />
    </div>
  );
};

export default ProjectList;
