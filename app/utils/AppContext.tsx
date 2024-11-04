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
  allProjects: [],
  projectActions: { append: (project: Project) => {} },
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

  const [allProjects, setAllProjects] = useState<Project[]>([]);
  const addProject = (project: Project) => {
    setAllProjects((projects) => [...projects, project]);
  };

  const isMaxSm = useMediaQuery("(max-width: 640px)");

  useEffect(() => {
    // structure for fetching data (proto)
    const fetchData = async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        // Update the state
        setAllProjects(exampleProjects);
      } catch (error) {
        console.log(error);
      }
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
        allProjects,
        projectActions: {
          append: addProject,
        },
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
