import { v4 as uuidv4 } from "uuid";
import { Project, ProjectSortMode, statusOrder } from "./types";
import { IconName } from "./projectIcons";

export const createProject = (title: string, icon: IconName) => {
  const createdAt = new Date().toISOString();

  const project: Project = {
    title,
    icon,
    id: uuidv4(),
    clerkUserId: "123",

    status: "pending",
    createdAt,
    updatedAt: createdAt,

    tasks: [],
  };

  return project;
};

export const updatedProject = (
  old_project: Project,
  title: string,
  icon: IconName,
) => {
  const updatedAt = new Date().toISOString();

  const project: Project = {
    ...old_project,

    title,
    icon,

    updatedAt,
  };

  return project;
};

export const timeSinceCreatedDisplay = (createdAt: string): string => {
  const creation = new Date(createdAt);
  const now = new Date();
  const differenceInTime = now.getTime() - creation.getTime();

  const minutesSinceCreated = differenceInTime / (1000 * 60);
  if (minutesSinceCreated < 60) {
    return `${Math.floor(minutesSinceCreated)} mins`;
  }

  const hoursSinceCreated = minutesSinceCreated / 60;

  if (hoursSinceCreated < 24) {
    return `${Math.floor(hoursSinceCreated)} hours`;
  }

  const daysSinceCreated = hoursSinceCreated / 24;
  return `${Math.floor(daysSinceCreated)} days`;
};

export const calculateProgressPercentage = (
  totalTasks: number,
  completedTasks: number,
): number => {
  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
};

export const coinFlip = () => {
  return Math.floor(Math.random() * 2) == 1;
};

export const getSortFunction = (mode: ProjectSortMode) => {
  switch (mode) {
    case "date":
      return (a: Project, b: Project) => {
        const a_date = new Date(a.createdAt);
        const b_date = new Date(b.createdAt);

        return a_date.getTime() - b_date.getTime();
      };

    case "status":
      return (a: Project, b: Project) => {
        if (a.status != b.status) {
          return statusOrder[a.status] - statusOrder[b.status];
        }

        // if the status' are the same, use percentage completion
        const a_percent = calculateProgressPercentage(
          a.tasks.length,
          a.tasks.filter((task) => task.status === "completed").length,
        );
        const b_percent = calculateProgressPercentage(
          b.tasks.length,
          b.tasks.filter((task) => task.status === "completed").length,
        );

        return a_percent - b_percent;
      };

    case "name":
    default:
      return (a: Project, b: Project) => a.title.localeCompare(b.title);
  }
};
