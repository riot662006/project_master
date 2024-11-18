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
    taskId?: string | null;
  }
  
  const addTaskModalSlice = createSlice({
    name: "addProjectModal",
    initialState: {
      isOpen: false,
      isDisabled: false,
      mode: "add",
      projectId: null,
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
  