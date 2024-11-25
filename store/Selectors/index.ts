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
    const taskToEdit = allTasks.find((taskObj) => taskObj.task.id === taskId) || null;

    return taskToEdit || {
      task: {id: "", priority: "medium", status: "pending", title: "", createdAt: "", updatedAt: "", icon: "default"},
      projectId: selectedProjectId,
      projectName: projectsList.find((project) => project.id === selectedProjectId)?.title || ""
    };
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
