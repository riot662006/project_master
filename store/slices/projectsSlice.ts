import { exampleProjects } from "@/utils/examples";
import { coinFlip } from "@/utils/functions";
import { Project, ProjectSortMode, Task } from "@/utils/types";

import {
  createSlice,
  PayloadAction,
  createAsyncThunk,
  isPending,
  isRejected,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface ProjectSortState {
  mode: ProjectSortMode;
  reverse: boolean;
}

interface ProjectsState {
  projectsList: Project[];
  isLoading: boolean;
  isFetching: boolean;
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
  async (userId: string) => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    return exampleProjects;
  },
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (project: Project) => {
    await new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (coinFlip()) {
          toast.success("Project added successfully");
          resolve();
        } else {
          toast.error("Something went wrong");
          reject();
        }
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
        if (coinFlip()) {
          toast.success("Project edited successfully");
          resolve();
        } else {
          toast.error("Something went wrong");
          reject();
        }
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
        if (coinFlip()) {
          toast.success("Project deleted successfully");
          resolve();
        } else {
          toast.error("Something went wrong");
          reject();
        }
      }, 1000),
    );
    return projectId;
  },
);

export const addTask = createAsyncThunk(
  "projects/addTask",
  async ({ task, projectId }: { task: Task; projectId: string }) => {
    await new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (coinFlip()) {
          toast.success("Task added successfully");
          resolve();
        } else {
          toast.error("Something went wrong");
          reject();
        }
      }, 1000),
    );
    return { task, projectId };
  },
);

export const updateTask = createAsyncThunk(
  "projects/updateTask",
  async ({
    task,
    projectId,
    successMsg,
  }: {
    task: Task;
    projectId: string;
    successMsg?: string;
  }) => {
    await new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (coinFlip()) {
          toast.success(successMsg || "Task edited successfully");
          resolve();
        } else {
          toast.error("Something went wrong");
          reject();
        }
      }, 1000),
    );
    return { task, projectId };
  },
);

export const deleteTask = createAsyncThunk(
  "projects/deleteTask",
  async (taskId: string) => {
    await new Promise<void>((resolve, reject) =>
      setTimeout(() => {
        if (coinFlip()) {
          toast.success("Task deleted successfully");
          resolve();
        } else {
          toast.error("Something went wrong");
          reject();
        }
      }, 1000),
    );
    return taskId;
  },
);

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projectsList: [],
    isFetching: true,
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
      .addCase(fetchProjects.pending, (state) => {
        state.isFetching = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) =>
        handleFulfilled(state, action, (state) => {
          state.projectsList = action.payload;
          state.isFetching = false;
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

      // Delete Project
      .addCase(deleteTask.fulfilled, (state, action) =>
        handleFulfilled(state, action, (state) => {
          const project = state.projectsList.find((project) =>
            project.tasks.some((task) => task.id == action.payload),
          );

          if (project) {
            project.tasks = project.tasks.filter(
              (task) => task.id !== action.payload,
            );
          }
        }),
      )

      // Add Task
      .addCase(addTask.fulfilled, (state, action) =>
        handleFulfilled(state, action, (state) => {
          const project = state.projectsList.find(
            (project) => project.id === action.payload.projectId,
          );

          project?.tasks.push(action.payload.task);
        }),
      )

      // Update Task
      .addCase(updateTask.fulfilled, (state, action) =>
        handleFulfilled(state, action, (state) => {
          const oldProjectLocation = state.projectsList.find((project) =>
            project.tasks.some((task) => task.id == action.payload.task.id),
          );

          if (oldProjectLocation) {
            oldProjectLocation.tasks = oldProjectLocation.tasks.filter(
              (task) => task.id !== action.payload.task.id,
            );
          }

          const newProjectLocation = state.projectsList.find(
            (project) => project.id == action.payload.projectId,
          );

          newProjectLocation?.tasks.push(action.payload.task);
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
