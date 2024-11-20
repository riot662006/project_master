import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";
import toast from "react-hot-toast";

interface AddTaskModalState {
  isOpen: boolean;
  isDisabled: boolean;
  mode: "add" | "edit";
  taskId: string | null;
  projectId: string | null;
}

const addTaskModalSlice = createSlice({
  name: "addProjectModal",
  initialState: {
    isOpen: false,
    isDisabled: false,
    mode: "add",

    taskId: null,
    projectId: null,
  } as AddTaskModalState,
  reducers: {
    openAddTaskModal: (state, action: PayloadAction<string | undefined>) => {
      state.isOpen = true;
      state.mode = "add";

      state.taskId = null;
      state.projectId = action.payload ?? null;
    },
    openEditTaskModal: (
      state,
      action: PayloadAction<{ taskId: string; projectId?: string }>,
    ) => {
      state.isOpen = true;
      state.mode = "edit";

      state.taskId = action.payload.taskId;
      state.projectId = action.payload.projectId ?? null;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.mode = "add";
      state.taskId = null;
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
            `Task ${state.mode == "add" ? "added" : "edited"} successfully`,
          );

          state.isOpen = false;
          state.mode = "add";
          state.taskId = null;
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

export const { openAddTaskModal, openEditTaskModal, closeModal } =
  addTaskModalSlice.actions;
export default addTaskModalSlice.reducer;
