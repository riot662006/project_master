import { v4 as uuidv4 } from "uuid";
import {
  BaseEntity,
  Priority,
  priorityOrder,
  Project,
  ProjectSortMode,
  statusOrder,
  Task,
  TaskObj,
  TaskSortMode,
} from "./types";
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

export const createTask = (
  title: string,
  icon: IconName,
  priority: Priority,
) => {
  const createdAt = new Date().toISOString();

  const task: Task = {
    title,
    icon,
    id: uuidv4(),

    status: "pending",
    createdAt,
    updatedAt: createdAt,

    priority,
  };

  return task;
};

export const updatedTask = (
  old_task: Task,
  title: string,
  icon: IconName,
  priority: Priority,
) => {
  const updatedAt = new Date().toISOString();

  const task: Task = {
    ...old_task,

    title,
    icon,

    updatedAt: updatedAt,
    priority,
  };

  return task;
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

export const sortByDate = (a: BaseEntity, b: BaseEntity) => {
  const a_date = new Date(a.createdAt);
  const b_date = new Date(b.createdAt);

  return a_date.getTime() - b_date.getTime();
};

export const sortByName = (a: BaseEntity, b: BaseEntity) => {
  return a.title.localeCompare(b.title);
};

export const getProjectSortFunction = (
  mode: ProjectSortMode,
  reverse = false,
) => {
  const sign = reverse ? -1 : 1; // reverses the function if necessary

  switch (mode) {
    case "date":
      return (a: Project, b: Project) => sign * sortByDate(a, b);

    case "status":
      return (a: Project, b: Project) => {
        if (a.status != b.status) {
          return sign * (statusOrder[a.status] - statusOrder[b.status]);
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

        return sign * (a_percent - b_percent);
      };

    case "name":
    default:
      return (a: Project, b: Project) => sign * sortByName(a, b);
  }
};

export const getTaskSortFunction = (mode: TaskSortMode, reverse = false) => {
  const sign = reverse ? -1 : 1;

  switch (mode) {
    case "date":
      return (a: TaskObj, b: TaskObj) => sign * sortByDate(a.task, b.task);

    case "status":
      return (a: TaskObj, b: TaskObj) => {
        if (a.task.status != b.task.status) {
          return (
            sign * (statusOrder[a.task.status] - statusOrder[b.task.status])
          );
        }

        // if the status' are the same
        return sign * sortByName(a.task, b.task);
      };

    case "priority":
      return (a: TaskObj, b: TaskObj) => {
        if (a.task.priority != b.task.priority) {
          return (
            sign *
            (priorityOrder[a.task.priority] - priorityOrder[b.task.priority])
          );
        }

        // if the status' are the same
        return sign * sortByName(a.task, b.task);
      };

    case "project_name":
      return (a: TaskObj, b: TaskObj) => {
        if (a.projectName != b.projectName)
          return sign * a.projectName.localeCompare(b.projectName);

        return sign * sortByName(a.task, b.task);
      };

    case "name":
    default:
      return (a: TaskObj, b: TaskObj) => sign * sortByName(a.task, b.task);
  }
};
