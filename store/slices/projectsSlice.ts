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
import { apiRequest } from "../helper";
import { Priority } from "@prisma/client";

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
    const response = await fetch(`/api/projects?userId=${userId}`);

    if (!response.ok) {
      const errorResponse = await response.json();
      throw errorResponse.error || "Failed to fetch projects";
    }

    const projects = await response.json();
    return projects;
  },
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (projectDetails: { title: string; icon: string }): Promise<Project> => {
    return apiRequest<Project>("/api/projects", "POST", projectDetails, {
      success: "Project added successfully",
      error: "Failed to add project",
    });
  },
);

export const updateProject = createAsyncThunk(
  "projects/updateProject",
  async ({
    projectId,
    ...projectDetails
  }: {
    projectId: string;
    title: string;
    icon: string;
  }) => {
    return apiRequest<Project>(
      `/api/projects/${projectId}`,
      "PUT",
      projectDetails,
      {
        success: "Project edited successfully",
        error: "Failed to edit project",
      },
    );
  },
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string) => {
    return apiRequest<{ projectId: string }>(
      `/api/projects/${projectId}`,
      "DELETE",
      {},
      {
        success: "Project deleted successfully",
        error: "Failed to delete project",
      },
    );
  },
);

export const addTask = createAsyncThunk(
  "projects/addTask",
  async (taskDetails: {
    title: string;
    icon: string;
    priority: Priority;
    projectId: string;
  }) => {
    const task = await apiRequest<Task & { projectId: string }>(
      `/api/projects/${taskDetails.projectId}/tasks`,
      "POST",
      taskDetails,
      {
        success: "Task added successfully",
        error: "Failed to add task",
      },
    );
    return task;
  },
);

export const updateTask = createAsyncThunk(
  "projects/updateTask",
  async (taskDetails: {
    title: string;
    icon: string;
    priority: Priority;
    oldProjectId: string;
    projectId: string;
    taskId: string;
  }) => {
    const task = await apiRequest<Task & { projectId: string }>(
      `/api/projects/${taskDetails.oldProjectId}/tasks/${taskDetails.taskId}`,
      "PUT",
      taskDetails,
      {
        success: "Task edited successfully",
        error: "Failed to edit task",
      },
    );
    return task;
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
            (project) => project.id !== action.payload.projectId,
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
          const { projectId, ...task } = action.payload;

          project?.tasks.push(task);
        }),
      )

      // Update Task
      .addCase(updateTask.fulfilled, (state, action) =>
        handleFulfilled(state, action, (state) => {
          const oldProjectLocation = state.projectsList.find((project) =>
            project.tasks.some((task) => task.id == action.payload.id),
          );

          if (oldProjectLocation) {
            oldProjectLocation.tasks = oldProjectLocation.tasks.filter(
              (task) => task.id !== action.payload.id,
            );
          }

          const newProjectLocation = state.projectsList.find(
            (project) => project.id == action.payload.projectId,
          );

          const { projectId, ...task } = action.payload;

          newProjectLocation?.tasks.push(task);
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
