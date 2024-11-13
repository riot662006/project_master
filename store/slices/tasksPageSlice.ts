import { createSlice, PayloadAction } from "@reduxjs/toolkit";

type ViewState = "on-going" | "completed";

interface TaskPageState {
  selectedProjectId: string;
  curView: ViewState;
}

const initialState: TaskPageState = {
  selectedProjectId: "",
  curView: "on-going",
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
  },
});

export const { setSelectedProject, setView } = taskPageSlice.actions;
export default taskPageSlice.reducer;
