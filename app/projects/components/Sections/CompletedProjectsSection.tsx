"use client";

import ProjectProgressCircle from "@/components/CircularProgressBar";
import ClipboardX from "@/components/Icons/ClipboardX";
import { useAppSelector } from "@/hooks/storeHooks";
import { Project } from "@/utils/types";
import Splitscreen from "@mui/icons-material/Splitscreen";
import { CircularProgress } from "@mui/material";
import { Fragment } from "react";
import colors from "tailwindcss/colors";

const CompletedProjectsSection = () => {
  const projectsLoading = useAppSelector((state) => state.projects.isLoading);
  const projects = useAppSelector((state) => state.projects.projectsList);

  if (projectsLoading) {
    return (<div className="flex h-full w-full min-w-56 flex-col items-center justify-center rounded-2xl bg-white">
      <CircularProgress size="5rem" sx={{ color: "skyblue" }} />
    </div>)
  }

  const completedProjects = projects.filter(
    (project) =>
      project.tasks.length > 0 &&
      project.tasks.every((task) => task.status == "completed"),
  );
  const completedPercentage = Math.floor(
    (completedProjects.length / projects.length) * 100,
  );
  const totalTasksDone = projects.reduce(
    (acc: number, project) =>
      acc + project.tasks.filter((task) => task.status == "completed").length,
    0,
  );

  return (
    <div className="flex h-full w-full min-w-56 flex-col items-center gap-20 rounded-2xl bg-white p-8">
      <h2 className="text-2xl font-bold">Projects Completed</h2>
      <div className="flex h-40 w-full items-center justify-center">
        <ProjectProgressCircle
          percentage={completedPercentage}
          radius={80}
          strokeWidth={12}
        />
      </div>

      {/* Labels */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-semibold">
          {completedProjects.length} Completed
        </p>
        <p className="text-[10px] text-slate-400">
          {totalTasksDone} Tasks done
        </p>
      </div>

      <ProjectsList completed={completedProjects} />
    </div>
  );
};

const ProjectsList = ({ completed }: { completed: Project[] }) => {
  if (completed.length == 0)
    return (
      <div className="flex w-full flex-col items-center">
        <ClipboardX color={colors.slate[300]} size={96} />
        <span className="text-center text-xs font-medium text-slate-300">
          No projects accomplished yet...
        </span>
      </div>
    );
  return (
    <ul className="flex w-full flex-col items-center gap-5 overflow-y-auto">
      {completed.map((project, index) => (
        <Fragment key={index}>
          <SingleProject project={project} />
          {index < completed.length - 1 && <hr className="w-[80%]" />}
        </Fragment>
      ))}
    </ul>
  );
};

const SingleProject = ({ project }: { project: Project }) => {
  return (
    <li className="flex w-full gap-2">
      <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-500">
        <Splitscreen sx={{ fontSize: "18px" }} className="text-white" />
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-semibold">{project.title}</p>
        <p className="text-[10px] text-slate-400">
          {project.tasks.length} Tasks
        </p>
      </div>
    </li>
  );
};

export default CompletedProjectsSection;
