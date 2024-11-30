import {
  createSlice,
  isFulfilled,
  isPending,
  isRejected,
  PayloadAction,
} from "@reduxjs/toolkit";

interface AddTaskModalState {
  isOpen: boolean;
  mode: "add" | "edit";
  taskId: string | null;
}

const addTaskModalSlice = createSlice({
  name: "addProjectModal",
  initialState: {
    isOpen: false,
    mode: "add",

    taskId: null,
  } as AddTaskModalState,
  reducers: {
    openAddTaskModal: (state) => {
      state.isOpen = true;
      state.mode = "add";

      state.taskId = null;
    },
    openEditTaskModal: (state, action: PayloadAction<string>) => {
      state.isOpen = true;
      state.mode = "edit";

      state.taskId = action.payload;
    },
    closeModal: (state) => {
      state.isOpen = false;
      state.mode = "add";
      state.taskId = null;
    },
  },
});

export const { openAddTaskModal, openEditTaskModal, closeModal } =
  addTaskModalSlice.actions;
export default addTaskModalSlice.reducer;
