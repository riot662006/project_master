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
  (state: RootState) => state.projects.projectsList,
  (projectsList) => projectsList.map((project) => project.title),
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
export const selectFetchProjects = (userId: string) =>
  apiSlice.endpoints.fetchProjects.select(userId);
export const selectProjectsV2 = (
  userId: string,
  sortBy?: ProjectSortMode,
  reverse = false,
) =>
  createSelector(
    apiSlice.endpoints.fetchProjects.select(userId), // Pass userId here
    (state: RootState) => state.projects.sortState,
    (queryResult, curSortState) => {
      if (!queryResult.data) return []; // Return empty if no data
      const sortState = sortBy ? { mode: sortBy, reverse } : curSortState;

      const sortedProjects = [...queryResult.data].sort((a, b) => {
        switch (sortState.mode) {
          case "date":
            return a.createdAt.getTime() - b.createdAt.getTime();
          case "status":
            if (a.status !== b.status)
              return statusOrder[a.status] - statusOrder[b.status];

            const a_percent = calculateProgressPercentage(
              a.tasks.length,
              a.tasks.filter((task) => task.status === "completed").length,
            );
            const b_percent = calculateProgressPercentage(
              b.tasks.length,
              b.tasks.filter((task) => task.status === "completed").length,
            );

            return a_percent - b_percent;
          case "name":
          default:
            return a.title.localeCompare(b.title);
        }
      });

      return reverse ? sortedProjects.reverse() : sortedProjects;
    },
  );
