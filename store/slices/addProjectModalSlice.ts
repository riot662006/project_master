import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
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
      .addMatcher(isPending, (state) => {
        if (state.isOpen) {
          state.isDisabled = true;
        }
      })
      .addMatcher(isFulfilled, (state) => {
        if (state.isOpen) {
          toast.success(
            `Project ${state.mode == "add" ? "added" : "edited"} successfully`,
          );

          state.isOpen = false;
          state.mode = "add";
          state.projectId = null;
          state.isDisabled = false;
        }
      })
      .addMatcher(isRejected, (state) => {
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
