import { AppDispatch, RootState } from "@/store";
import { useFetchProjectsQuery } from "@/store/slices/apiSlice";
import {
  priorityOrder,
  ProjectSortMode,
  statusOrder,
  TaskSortMode,
} from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useMemo } from "react";
import { calculateProgressPercentage } from "@/utils/functions";
import { SerializableProject, SerializableTask } from "@/utils/types";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

/**
 * Hook: Fetch all projects including tasks.
 */
export const useProjects = (): {
  projects: SerializableProject[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown; // Replace `any` with specific error type if known
} => {
  const {
    data: projects = [],
    isLoading,
    isFetching,
    error,
  } = useFetchProjectsQuery();

  return { projects, isLoading, isFetching, error };
};

/**
 * Hook: Fetch and sort projects based on the sort mode and order.
 */
export const useSortedProjects = (
  sortBy: ProjectSortMode = "name",
  reverse = false,
): {
  projects: SerializableProject[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
} => {
  const { projects, isLoading, isFetching, error } = useProjects();

  const sortedProjects = useMemo(() => {
    if (!projects.length) return [];

    const sorted = [...projects].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "date":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        case "status":
          if (statusOrder[a.status] !== statusOrder[b.status])
            return statusOrder[a.status] - statusOrder[b.status];

          const aProgress = calculateProgressPercentage(
            a.tasks.length,
            a.tasks.filter((task) => task.status === "completed").length,
          );
          const bProgress = calculateProgressPercentage(
            b.tasks.length,
            b.tasks.filter((task) => task.status === "completed").length,
          );

          return aProgress - bProgress;
        default:
          return 0;
      }
    });

    return reverse ? sorted.reverse() : sorted;
  }, [projects, sortBy, reverse]);

  return { projects: sortedProjects, isLoading, isFetching, error };
};

/**
 * Hook: Fetch all tasks or tasks for a specific project.
 */
export const useTasks = (
  projectId?: string | null,
): {
  tasks: SerializableTask[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
} => {
  const {
    data: projects = [],
    isLoading,
    isFetching,
    error,
  } = useFetchProjectsQuery();

  const tasks = useMemo(() => {
    if (!projects.length) return [];

    if (projectId && projectId.length) {
      const project = projects.find((proj) => proj.id === projectId);
      return project?.tasks || [];
    }

    return projects.flatMap((proj) => proj.tasks);
  }, [projects, projectId]);

  return { tasks, isLoading, isFetching, error };
};

/**
 * Hook: Fetch and sort tasks based on the projectId, sort mode, and order.
 */
export const useSortedTasks = (
  projectId?: string | null,
  sortBy: TaskSortMode = "name",
  reverse = false,
): {
  tasks: SerializableTask[];
  isLoading: boolean;
  isFetching: boolean;
  error: unknown;
} => {
  const { tasks, isLoading, isFetching, error } = useTasks(projectId);

  const sortedTasks = useMemo(() => {
    if (!tasks.length) return [];

    const sorted = [...tasks].sort((a, b) => {
      switch (sortBy) {
        case "name":
          return a.title.localeCompare(b.title);
        case "status":
          if (statusOrder[a.status] !== statusOrder[b.status])
            return statusOrder[a.status] - statusOrder[b.status];

          return a.title.localeCompare(b.title);
        case "priority":
          if (priorityOrder[a.priority] !== priorityOrder[b.priority])
            return priorityOrder[a.priority] - priorityOrder[b.priority];

          return a.title.localeCompare(b.title);
        case "project_name":
          if (a.project.title !== b.project.title)
            return a.project.title.localeCompare(b.project.title);
          return a.title.localeCompare(b.title);
        case "date":
          return (
            new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
          );
        default:
          return 0;
      }
    });

    return reverse ? sorted.reverse() : sorted;
  }, [tasks, sortBy, reverse]);

  return { tasks: sortedTasks, isLoading, isFetching, error };
};
