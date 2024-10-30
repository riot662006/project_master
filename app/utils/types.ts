import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";

export type Status = "pending" | "in_progress" | "completed";
export type Proirity = "low" | "medium" | "high";

export interface Task {
  // task object for the app
  id: number;
  title: string;
  status: Status;
  priority: Proirity;
  createdAt: string;
  updatedAt: string;
  icon: string;
}

export interface Project {
  // project object for the app
  id: number;
  title: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  icon: string;
  tasks: Task[];
}

export type IconData = {
  // icon data used in ./projectIcon.ts file
  id: number;
  name: string;
  IconComponent: React.ElementType;
};

export type SidebarObjType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

export type AddProjectModalMode = "default" | "select-icon";

export interface IAddProjectFormInput {
  name: string;
  icon_id: number;
}

export type AddProjectModalObjType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  mode: AddProjectModalMode;
  setMode: Dispatch<SetStateAction<AddProjectModalMode>>;
  formData: UseFormReturn<IAddProjectFormInput>;
};

export interface IAppContext {
  sidebarObj: SidebarObjType;
  addProjectModalObj: AddProjectModalObjType;
  allProjects: Project[];
}
