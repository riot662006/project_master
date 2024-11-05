import { Dispatch, SetStateAction } from "react";
import { UseFormReturn } from "react-hook-form";
import { IconName } from "./projectIcons";

export type Status = "pending" | "in_progress" | "completed";
export type Proirity = "low" | "medium" | "high";

export interface Task {
  // task object for the app
  id: string;
  title: string;
  status: Status;
  priority: Proirity;
  createdAt: string;
  updatedAt: string;
  icon: IconName;
}

export interface Project {
  // project object for the app
  id: string;
  clerkUserId: string;
  title: string;
  status: Status;
  createdAt: string;
  updatedAt: string;
  icon: IconName;
  tasks: Task[];
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

export type ConfirmProjectDeleteModalObjType = {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;

  projectId: string;
  setProjectId: Dispatch<SetStateAction<string>>;
};

export interface IAppContext {
  sidebarObj: SidebarObjType;
  addProjectModalObj: AddProjectModalObjType;
  confirmProjectDeleteModalObj: ConfirmProjectDeleteModalObjType;
  allProjects: Project[];
  projectActions: {
    append: (project: Project) => void;
    delete: (projectId: string) => void;
  };
}
