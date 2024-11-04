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
