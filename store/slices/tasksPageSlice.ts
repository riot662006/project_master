import { TaskSortMode } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type ViewState = "all" | "on-going" | "completed";

export interface TaskSortState {
  mode: TaskSortMode;
  reverse: boolean;
}

interface TaskPageState {
  selectedProjectId: string;
  curView: ViewState;
  sortState: TaskSortState;
}

const initialState: TaskPageState = {
  selectedProjectId: "",
  curView: "on-going",
  sortState: { mode: "name", reverse: false },
};

const taskPageSlice = createSlice({
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
  taskPageSlice.actions;
export default taskPageSlice.reducer;
