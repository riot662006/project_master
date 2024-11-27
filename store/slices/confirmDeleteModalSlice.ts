import { createSlice, isPending, PayloadAction } from "@reduxjs/toolkit";
import { deleteProject, deleteTask } from "./projectsSlice";
import { ConfirmDeleteModalObjectType } from "@/utils/types";

interface ConfirmDeleteModalState {
  isOpen: boolean;
  objectId: string;
  objectIdType: ConfirmDeleteModalObjectType;
  isDisabled: boolean;
}

const confirmDeleteModalSlice = createSlice({
  name: "confirmDeleteModal",
  initialState: {
    isOpen: false,
    objectId: "",
    taskId: "",
    objectIdType: "project",
    isDisabled: false,
  } as ConfirmDeleteModalState,
  reducers: {
    setConfirmDeleteModal: (
      state,
      action: PayloadAction<{
        isOpen: boolean;
        projectOrTaskId?: string;
        idType?: ConfirmDeleteModalObjectType;
      }>,
    ) => {
      state.isOpen = action.payload.isOpen;

      state.objectId = action.payload.projectOrTaskId || "";
      state.objectIdType = action.payload.idType || "project";
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(deleteProject.fulfilled, (state) => {
        if (state.isOpen) {
          state.objectId = "";
          state.isOpen = false;
          state.isDisabled = false;
        }
      })
      .addCase(deleteProject.rejected, (state) => {
        if (state.isOpen) {
          state.isDisabled = false;
        }
      })

      .addCase(deleteTask.fulfilled, (state) => {
        if (state.isOpen) {
          state.objectId = "";
          state.isOpen = false;
          state.isDisabled = false;
        }
      })
      .addCase(deleteTask.rejected, (state) => {
        if (state.isOpen) {
          state.isDisabled = false;
        }
      })

      // Handle all pending actions
      .addMatcher(isPending, (state) => {
        if (state.isOpen) state.isDisabled = true;
      });
  },
});

export const { setConfirmDeleteModal } = confirmDeleteModalSlice.actions;
export default confirmDeleteModalSlice.reducer;
