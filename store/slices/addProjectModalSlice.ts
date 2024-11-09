import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { addProject } from "./projectsSlice";
import toast from "react-hot-toast";

interface AddProjectModalState {
  isOpen: boolean;
  isDisabled: boolean;
  mode: "add" | "edit";
  projectId?: string | null;
}

const addProjectModalSlice = createSlice({
  name: "addProjectModal",
  initialState: {
    isOpen: false,
    isDisabled: false,
    mode: "add",
    projectId: null,
  } as AddProjectModalState,
  reducers: {
    openAddProjectModal: (state) => {
      state.isOpen = true;
      state.mode = "add";
      state.projectId = null;
    },
    openEditProjectModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.mode = "edit";
      state.projectId = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.mode = "add";
      state.projectId = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(addProject.pending, (state) => {
        if (state.isOpen) {
          state.isDisabled = true;
        }
      })
      .addCase(addProject.fulfilled, (state) => {
        if (state.isOpen) {
          toast.success("Project added successfully");

          state.isOpen = false;
          state.isDisabled = false;
        }
      })
      .addCase(addProject.rejected, (state) => {
        if (state.isOpen) {
          toast.error("Something went wrong");

          state.isDisabled = false;
        }
      });
  },
});

export const { openAddProjectModal, openEditProjectModal, closeModal } =
  addProjectModalSlice.actions;
export default addProjectModalSlice.reducer;
