import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "..";
import { ProjectSortMode, TaskObj } from "@/utils/types";
import { getProjectSortFunction } from "@/utils/functions";

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

export const selectTasks = (projectId?: string) =>
  createSelector(
    (state: RootState) => state.projects.projectsList,
    (projectsList) => {
      if (projectId) {
        const project = projectsList.find(
          (project) => project.id === projectId,
        );
        return project
          ? project.tasks.map(
              (task): TaskObj => ({
                task,
                projectName: project.title,
              }),
            )
          : [];
      }

      return projectsList.flatMap((project) =>
        project.tasks.map(
          (task): TaskObj => ({
            task,
            projectName: project.title,
          }),
        ),
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
