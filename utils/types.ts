import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { IconName } from "./projectIcons";

export type Status = "pending" | "in_progress" | "completed";
export const statusOrder: { [key in Status]: number } = {
  pending: 1,
  in_progress: 2,
  completed: 3,
};

export type Priority = "low" | "medium" | "high";
export const priorityOrder: { [key in Priority]: number } = {
  low: 1,
  medium: 2,
  high: 3,
};

export interface BaseEntity {
  id: string;
  title: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  icon: IconName;
}

export interface Task extends BaseEntity {
  // task object for the app
  priority: Priority;
}

export interface Project extends BaseEntity {
  // project object for the app
  clerkUserId: string;
  tasks: Task[];
}

export interface TaskObj {
  task: Task;
  projectName: string;
}

export type IconData = {
  // icon data used in ./projectIcon.ts file
  id: number;
  name: IconName;
  IconComponent: React.ElementType;
};

export type SidebarObjType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type AddProjectModalMode = "default" | "select-icon";
export type ProjectSortMode = "date" | "name" | "status";
export type TaskSortMode =
  | "project_name"
  | "date"
  | "name"
  | "status"
  | "priority";

export interface IAddProjectFormInput {
  name: string;
  icon: IconName;
}

export interface IAddTaskFormInput {
  name: string;
  icon: IconName;
  priority: Priority;
  projectId: string;
}

export type AddProjectModalObjType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mode: AddProjectModalMode;
  setMode: Dispatch<SetStateAction<AddProjectModalMode>>;
  formData: UseFormReturn<IAddProjectFormInput>;
};

export type ConfirmProjectDeleteModalObjType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  projectId: string;
  setProjectId: Dispatch<SetStateAction<string>>;
};
