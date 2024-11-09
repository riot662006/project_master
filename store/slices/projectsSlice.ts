import { exampleProjects } from "@/utils/examples";
import { coinFlip } from "@/utils/functions";
import { Project } from "@/utils/types";
import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";

interface ProjectsState {
  projectsList: Project[];
  isLoading: boolean;
}

export const fetchProjects = createAsyncThunk(
  "projects/fetchProjects",
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    console.log("Got it!!!");
    return exampleProjects;
  },
);

export const addProject = createAsyncThunk(
  "projects/addProject",
  async (project: Project, thunkAPI) => {
    await new Promise<void>((resolve, reject) => setTimeout(() => {
      if (coinFlip()) resolve(); 
      else reject();
    }, 1000));

    return project;
  }
);

export const deleteProject = createAsyncThunk(
  "projects/deleteProject",
  async (projectId: string, thunkAPI) => {
    await new Promise<void>((resolve, reject) => setTimeout(() => {
      if (coinFlip()) resolve(); 
      else reject();
    }, 1000));
    return projectId;
  }
)

const projectsSlice = createSlice({
  name: "projects",
  initialState: { projectsList: [], isLoading: true } as ProjectsState,
  reducers: {
    updateProject: (state, action: PayloadAction<Project>) => {
      const index = state.projectsList.findIndex(
        (project) => project.id === action.payload.id,
      );
      if (index !== -1) {
        state.projectsList[index] = action.payload;
      }
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProjects.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProjects.fulfilled, (state, action) => {
        state.projectsList = action.payload;
        state.isLoading = false;
      })
      .addCase(fetchProjects.rejected, (state) => {
        state.isLoading = false;
      })

      .addCase(deleteProject.fulfilled, (state, action) => {
        state.projectsList = state.projectsList.filter(
          (project) => project.id !== action.payload,
        );
      })

      .addCase(addProject.fulfilled, (state, action) => {
        state.projectsList.push(action.payload);
      })
  },
});

export const { updateProject } =
  projectsSlice.actions;
export default projectsSlice.reducer;
