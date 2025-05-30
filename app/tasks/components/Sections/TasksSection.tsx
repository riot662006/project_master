"use client";

import { useProjects } from "@/hooks/useStoreHooks";
import TasksHeader from "../Header/TaskHeader";
import TaskList from "../Lists/TaskList";
import { CircularProgress } from "@mui/material";
import AddTaskModal from "../Modals/AddTaskModal";
import ConfirmDeleteModal from "@/components/Modals/ConfirmProjectDeleteModal";
import LoadingContainer from "@/components/Containers/LoadingContainer";

const TasksSection = () => {
  const { isLoading } = useProjects();

  return (
    <LoadingContainer className="flex h-full w-full px-8 py-10">
      <div className="flex h-full w-full flex-col px-8 py-10 max-lg:px-0">
        {isLoading ? (
          <div className="flex h-full w-full items-center justify-center">
            <CircularProgress size="5rem" sx={{ color: "skyblue" }} />
          </div>
        ) : (
          <>
            <TasksHeader />
            <TaskList />
          </>
        )}
      </div>
      <AddTaskModal />
      <ConfirmDeleteModal />
    </LoadingContainer>
  );
};

export default TasksSection;
