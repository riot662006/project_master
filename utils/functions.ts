import { v4 as uuidv4 } from "uuid";
import { Project } from "./types";
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
}