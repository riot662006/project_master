import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ProjectSortMode, TaskObj, TaskSortMode } from "@/utils/types";
import { getProjectSortFunction, getTaskSortFunction } from "@/utils/functions";

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
            }),
          ),
        )
        .sort(getTaskSortFunction(sortState.mode, sortState.reverse));
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
