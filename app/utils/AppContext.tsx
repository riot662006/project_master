"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useMediaQuery from "./hooks/useMediaQuery";
import { useForm, UseFormReturn } from "react-hook-form";
import {
  AddProjectModalMode,
  IAddProjectFormInput,
  IAppContext,
  Project,
} from "./types";
import { exampleProjects } from "./examples";

const AppContext = createContext<IAppContext>({
  sidebarObj: { isOpen: false, setIsOpen: () => {} },
  addProjectModalObj: {
    isOpen: false,
    setIsOpen: () => {},
    mode: "default",
    setMode: () => {},
    formData: {} as UseFormReturn<IAddProjectFormInput>,
  },
  confirmProjectDeleteModalObj: {
    isOpen: false,
    setIsOpen: () => {},

    projectId: "",
    setProjectId: () => {},
  },
  allProjects: [],
  projectActions: { append: () => {}, delete: () => {}, isLoading: false },
});

export const AppContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);

  const [isAddProjectModalOpen, setIsAddProjectModalOpen] =
    useState<boolean>(false);
  const [projectModalMode, setProjectModalMode] =
    useState<AddProjectModalMode>("default");
  const addProjectModalFormData = useForm<IAddProjectFormInput>({
    defaultValues: { icon_id: 1 },
  });

  const [isConfirmProjectDeleteModalOpen, setIsConfirmProjectDeleteModalOpen] =
    useState<boolean>(false);
  const [projectToDelete, setProjectToDelete] = useState<string>("");

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const [isLoadingProjects, setIsLoadingProjects] = useState<boolean>(true);
  const addProject = (project: Project) => {
    setAllProjects((projects) => [...projects, project]);
  };
  const deleteProject = (projectId: string) => {
    setAllProjects((projects) =>
      projects.filter((project) => project.id !== projectId),
    );
  };

  const isMaxSm = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    // structure for fetching data (proto)
    const fetchData = async () => {
      setIsLoadingProjects(true);
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Update the state
        setAllProjects(exampleProjects);
      } catch (error) {
        console.log(error);
      }
      setIsLoadingProjects(false);
    };
    fetchData();
  }, []);

  useEffect(() => {
    setIsSidebarOpen(false);
  }, [isMaxSm]);

  return (
    <AppContext.Provider
      value={{
        sidebarObj: {
          isOpen: isSidebarOpen,
          setIsOpen: setIsSidebarOpen,
        },
        addProjectModalObj: {
          isOpen: isAddProjectModalOpen,
          setIsOpen: setIsAddProjectModalOpen,

          mode: projectModalMode,
          setMode: setProjectModalMode,

          formData: addProjectModalFormData,
        },
        confirmProjectDeleteModalObj: {
          isOpen: isConfirmProjectDeleteModalOpen,
          setIsOpen: setIsConfirmProjectDeleteModalOpen,

          projectId: projectToDelete,
          setProjectId: setProjectToDelete,
        },
        allProjects,
        projectActions: {
          append: addProject,
          delete: deleteProject,
          isLoading: isLoadingProjects,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
