import { exampleProjects } from "@/utils/examples";
import { coinFlip, getProjectSortFunction } from "@/utils/functions";
import { Project, ProjectSortMode, TaskObj } from "@/utils/types";
import { createSelector } from "reselect";
import { RootState } from "..";

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";

interface ProjectSortState {
  mode: ProjectSortMode;
  reverse: boolean;
}

interface ProjectsState {
  projectsList: Project[];
  isLoading: boolean;
  sortState: ProjectSortState;
}

const handleFulfilled = <T>(
  state: ProjectsState,
  action: PayloadAction<T>,
  updateFn: (state: ProjectsState, action: PayloadAction<T>) => void,
) => {
  updateFn(state, action);
  state.isLoading = false;
};

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return exampleProjects;
  },
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (project: Project) => {
    await new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (coinFlip()) resolve();
        else reject();
      }, 1000),
    );

    return project;
  },
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async (project: Project) => {
    await new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (coinFlip()) resolve();
        else reject();
      }, 1000),
    );
    return project;
  },
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string) => {
    await new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (coinFlip()) resolve();
        else reject();
      }, 1000),
    );
    return projectId;
  },
);

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

export const selectAllTasks = createSelector(
  (state: RootState) => state.projects.projectsList,
  (projectsList) => {
    const allTasks: TaskObj[] = [];

    projectsList.forEach((project) => {
      project.tasks.forEach((task) => {
        allTasks.push({
          task,
          projectName: project.title,
        });
      });
    });

    return allTasks;
  },
);

export const selectProjects = (sortBy?: ProjectSortMode, reverse = false) =>
  createSelector(
    (state: RootState) => state.projects.projectsList,
    (state: RootState) => state.projects.sortState,
    (projectsList, curSortState) => {
      const sortState = sortBy ? {mode: sortBy, reverse} : curSortState;

      return [...projectsList].sort(
        getProjectSortFunction(sortState.mode, sortState.reverse),
      );
    },
  );

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projectsList: [],
    isLoading: true,
    sortState: { mode: "date", reverse: true },
  } as ProjectsState,
  reducers: {
    setSortState: (state, action: PayloadAction<ProjectSortState>) => {
      state.sortState = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch Projects
      .addCase(fetchProjects.fulfilled, (state, action) =>
        handleFulfilled(state, action, (state) => {
          state.projectsList = action.payload;
        }),
      )

      // Delete Project
      .addCase(deleteProject.fulfilled, (state, action) =>
        handleFulfilled(state, action, (state) => {
          state.projectsList = state.projectsList.filter(
            (project) => project.id !== action.payload,
          );
        }),
      )

      // Add Project
      .addCase(addProject.fulfilled, (state, action) =>
        handleFulfilled(state, action, (state) => {
          state.projectsList.push(action.payload);
        }),
      )

      // Update Projects
      .addCase(updateProject.fulfilled, (state, action) =>
        handleFulfilled(state, action, (state) => {
          const index = state.projectsList.findIndex(
            (project) => project.id === action.payload.id,
          );
          if (index !== -1) {
            state.projectsList[index] = action.payload;
          }
        }),
      )

      // Handle all pending actions
      .addMatcher(isPending, (state) => {
        state.isLoading = true;
      })

      // Handle all rejected actions
      .addMatcher(isRejected, (state) => {
        state.isLoading = false;
      });
  },
});

export const { setSortState } = projectsSlice.actions;
export default projectsSlice.reducer;
