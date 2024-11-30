import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AddProjectModalState {
  isOpen: boolean;
  mode: "add" | "edit";
  projectId?: string | null;
}

const addProjectModalSlice = createSlice({
  name: "addProjectModal",
  initialState: {
    isOpen: false,
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
});

export const { openAddProjectModal, openEditProjectModal, closeModal } =
  addProjectModalSlice.actions;
export default addProjectModalSlice.reducer;
