"use client";

import { useAppSelector } from "@/hooks/storeHooks";
import TasksHeader from "../Header/TaskHeader";
import TaskList from "../Lists/TaskList";
import { CircularProgress } from "@mui/material";

const TasksSection = () => {
  const isLoading = useAppSelector((state) => state.projects.isLoading);

  return (
    <div className="flex h-full w-full px-8 py-10">
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
    </div>
  );
};

export default TasksSection;
