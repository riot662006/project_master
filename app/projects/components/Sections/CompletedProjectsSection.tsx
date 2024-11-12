"use client";

import ProjectProgressCircle from "@/components/CircularProgressBar";
import { useAppSelector } from "@/hooks/storeHooks";
import { Project } from "@/utils/types";
import Splitscreen from "@mui/icons-material/Splitscreen";
import { Fragment } from "react";

const CompletedProjectsSection = () => {
  const projects = useAppSelector((state) => state.projects.projectsList);

  const completedProjects = projects.filter((project) =>
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
    <div className="flex h-full w-full flex-col items-center gap-20 rounded-2xl bg-white p-8">
      <h2 className="font-bold">Projects Completed</h2>
      <ProjectProgressCircle
        percentage={completedPercentage}
        radius={80}
        strokeWidth={12}
      />

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
  return (
    <ul className="flex w-full flex-col items-center gap-5 overflow-auto">
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
