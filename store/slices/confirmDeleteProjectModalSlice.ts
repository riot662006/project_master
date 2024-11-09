import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { deleteProject } from "./projectsSlice";
import toast from "react-hot-toast";

interface ConfirmDeleteModalState {
  isOpen: boolean;
  projectId: string;
  isDisabled: boolean;
}

const confirmDeleteModalSlice = createSlice({
  name: "confirmDeleteModal",
  initialState: {
    isOpen: false,
    projectId: "",
    isDisabled: false,
  } as ConfirmDeleteModalState,
  reducers: {
    setConfirmDeleteModalOpen: (state, action: PayloadAction<boolean>) => {
      state.isOpen = action.payload;
    },
    setProjectToDelete: (state, action: PayloadAction<string>) => {
      state.projectId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProject.pending, (state) => {
        if (state.isOpen) {
          state.isDisabled = true;
        }
      })
      .addCase(deleteProject.fulfilled, (state) => {
        if (state.isOpen) {
          toast.success("Project deleted successfully");

          state.isOpen = false;
          state.isDisabled = false;
        }
      })
      .addCase(deleteProject.rejected, (state) => {
        if (state.isOpen) {
          toast.error("Something went wrong");

          state.isDisabled = false;
        }
      });
  },
});

export const { setConfirmDeleteModalOpen, setProjectToDelete } =
  confirmDeleteModalSlice.actions;
export default confirmDeleteModalSlice.reducer;
