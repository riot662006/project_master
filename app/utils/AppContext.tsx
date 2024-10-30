"use client";

import { createContext, useContext, useEffect, useState } from "react";
import useMediaQuery from "./useMediaQuery";
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

  const [allProjects, setAllProjects] = useState<Project[]>(exampleProjects);

  const isMaxSm = useMediaQuery("(max-width: 640px)");

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
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => useContext(AppContext);
