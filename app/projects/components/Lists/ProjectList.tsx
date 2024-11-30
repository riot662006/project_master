"use client";

import ProjectCard from "../Cards/ProjectCard";
import { ListAlt } from "@mui/icons-material";
import { CircularProgress } from "@mui/material";
import { useAppSelector, useSortedProjects } from "@/hooks/useStoreHooks";

const ProjectList = () => {
  const { mode, reverse } = useAppSelector(
    (state) => state.projectsUI.sortState,
  );
  const { projects, isLoading, isFetching, error } = useSortedProjects(
    mode,
    reverse,
  );

  if (isLoading || isFetching) {
    return (
      <div className="flex h-full w-full items-center justify-center">
        <CircularProgress size="5rem" sx={{ color: "skyblue" }} />
      </div>
    );
  }

  if (projects.length == 0) {
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
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} />
      ))}
    </div>
  );
};

export default ProjectList;
