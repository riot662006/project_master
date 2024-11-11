import { exampleProjects } from "@/utils/examples";
import {
  coinFlip,
  getSortFunction,
} from "@/utils/functions";
import { Project, ProjectSortMode} from "@/utils/types";
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
  projectsSlice.caseReducers.sortProjects(state, { payload: null, type: "" });
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

const projectsSlice = createSlice({
  name: "projects",
  initialState: {
    projectsList: [],
    isLoading: true,
    sortState: { mode: "date", reverse: true },
  } as ProjectsState,
  reducers: {
    sortProjects: (state, action: PayloadAction<ProjectSortState | null>) => {
      const sortState = action.payload ?? state.sortState;

      const sortedProjects = [...state.projectsList].sort(
        getSortFunction(sortState.mode),
      );

      if (sortState.reverse) {
        sortedProjects.reverse();
      }

      state.projectsList = sortedProjects;

      if (action.payload) {
        state.sortState = sortState;
      }
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

export const { sortProjects } = projectsSlice.actions;
export default projectsSlice.reducer;
