import { TaskSortMode } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ViewState = "all" | "on-going" | "completed";

export interface TaskSortState {
  mode: TaskSortMode;
  reverse: boolean;
}

interface TaskUIState {
  selectedProjectId: string;
  curView: ViewState;
  sortState: TaskSortState;
}

const initialState: TaskUIState = {
  selectedProjectId: "",
  curView: "on-going",
  sortState: { mode: "name", reverse: false },
};

const tasksUISlice = createSlice({
  name: "taskPage",
  initialState,
  reducers: {
    setSelectedProject: (state, action: PayloadAction<string>) => {
      state.selectedProjectId = action.payload;
    },
    setView: (state, action: PayloadAction<ViewState>) => {
      if (state.curView == action.payload) return;
      state.curView = action.payload;
    },
    setSortState: (state, action: PayloadAction<TaskSortState>) => {
      state.sortState = action.payload;
    },
  },
});

export const { setSelectedProject, setView, setSortState } =
  tasksUISlice.actions;
export default tasksUISlice.reducer;
