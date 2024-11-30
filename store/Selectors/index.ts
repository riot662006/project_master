import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import {
  ProjectSortMode,
  statusOrder,
  TaskObj,
  TaskSortMode,
} from "@/utils/types";
import {
  calculateProgressPercentage,
  getProjectSortFunction,
  getTaskSortFunction,
} from "@/utils/functions";
import { apiSlice } from "../slices/apiSlice";


export const selectAllProjectNames = createSelector(
  (state: RootState) => state.user.userId, // Access userId from Redux
  (userId) => {
    const queryResult = apiSlice.endpoints.fetchProjects.select(userId)(state);
    if (!userId || !queryResult?.data) return []; // Ensure userId and data exist
    return queryResult.data.map((project) => project.title); // Return project titles
  }
);

export const selectProjectToEdit = createSelector(
  (state: RootState) => state.projects.projectsList,
  (state: RootState) => state.addProjectModal.projectId,
  (projectsList, projectId) =>
    projectId ? projectsList.find((project) => project.id === projectId) : null,
);

export const selectTasks = (
  projectId?: string,
  sortBy?: TaskSortMode,
  reverse = false,
) =>
  createSelector(
    (state: RootState) => state.projects.projectsList,
    (state: RootState) => state.tasksPage.sortState,
    (projectsList, curSortState) => {
      const sortState = sortBy ? { mode: sortBy, reverse } : curSortState;

      if (projectId) {
        const project = projectsList.find(
          (project) => project.id === projectId,
        );
        return project
          ? project.tasks
              .map(
                (task): TaskObj => ({
                  task,
                  projectName: project.title,
                  projectId: project.id,
                }),
              )
              .sort(getTaskSortFunction(sortState.mode, sortState.reverse))
          : [];
      }

      return projectsList
        .flatMap((project) =>
          project.tasks.map(
            (task): TaskObj => ({
              task,
              projectName: project.title,
              projectId: project.id,
            }),
          ),
        )
        .sort(getTaskSortFunction(sortState.mode, sortState.reverse));
    },
  );

export const selectTaskToEdit = createSelector(
  (state: RootState) => state.projects.projectsList, // Get list of projects
  (state: RootState) => state.addTaskModal.taskId, // Get the taskId from modal state
  (state: RootState) => state.tasksPage.selectedProjectId, // To set the default value of the projectId if no task to edit
  (projectsList, taskId, selectedProjectId): TaskObj => {
    const allTasks = projectsList.flatMap((project) =>
      project.tasks.map(
        (task): TaskObj => ({
          task,
          projectName: project.title,
          projectId: project.id,
        }),
      ),
    );
    const taskToEdit =
      allTasks.find((taskObj) => taskObj.task.id === taskId) || null;

    return (
      taskToEdit || {
        task: {
          id: "",
          priority: "medium",
          status: "pending",
          title: "",
          createdAt: "",
          updatedAt: "",
          icon: "default",
        },
        projectId: selectedProjectId,
        projectName:
          projectsList.find((project) => project.id === selectedProjectId)
            ?.title || "",
      }
    );
  },
);

export const selectProjects = (sortBy?: ProjectSortMode, reverse = false) =>
  createSelector(
    (state: RootState) => state.projects.projectsList,
    (state: RootState) => state.projects.sortState,
    (projectsList, curSortState) => {
      const sortState = sortBy ? { mode: sortBy, reverse } : curSortState;

      return [...projectsList].sort(
        getProjectSortFunction(sortState.mode, sortState.reverse),
      );
    },
  );
export const selectProject = (projectId: string) =>
  createSelector(
    (state: RootState) => state.projects.projectsList,
    (projectsList) => {
      return projectsList.find((project) => project.id == projectId) ?? null;
    },
  );

// experimental
export const selectFetchProjects = createSelector(
  (state) => state.user.userId, // Access userId from Redux
  (userId) =>
    userId
      ? apiSlice.endpoints.fetchProjects.select(userId)
      : () => ({ data: [] }),
);
export const selectProjectsV2 = (sortBy?: ProjectSortMode, reverse = false) =>
  createSelector(
    [
      (state: RootState) => state.user.userId, // Selector to get userId
      (state: RootState) => state.projectsUI.sortState, // Selector to get current sort state
      (state: RootState) => state, // Pass entire state for queryResult selector
    ],
    (userId, curSortState, state) => {
      if (!userId) return []; // If userId is not available, return empty array

      const queryResult =
        apiSlice.endpoints.fetchProjects.select(userId)(state); // Get query result

      if (!queryResult.data) return []; // If no data, return empty array

      const sortState = sortBy ? { mode: sortBy, reverse } : curSortState;
      console.log(sortState);

      // Sort projects based on the selected mode
      const sortedProjects = [...queryResult.data].sort((a, b) => {
        switch (sortState.mode) {
          case "date":
            return (
              new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            );

          case "status":
            // Compare by status order first
            if (a.status !== b.status) {
              return statusOrder[a.status] - statusOrder[b.status];
            }

            // Compare by percentage of completed tasks as a secondary criterion
            const aProgress = calculateProgressPercentage(
              a.tasks.length,
              a.tasks.filter((task) => task.status === "completed").length,
            );
            const bProgress = calculateProgressPercentage(
              b.tasks.length,
              b.tasks.filter((task) => task.status === "completed").length,
            );

            return aProgress - bProgress;

          case "name":
          default:
            // Default to sorting alphabetically by title
            return a.title.localeCompare(b.title);
        }
      });

      // Reverse the sorted projects if `reverse` is true
      return sortState.reverse ? sortedProjects.reverse() : sortedProjects;
    },
  );
