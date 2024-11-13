import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

type ViewState = "on-going" | "completed";

interface TaskPageState {
  selectedProjectId: string;
  curView: ViewState;
}

const initialState: TaskPageState = {
  selectedProjectId: "",
  curView: "on-going",
};

export const getTaskPageSelectedProject = createSelector(
  [
    (state: RootState) => state.projects.projectsList,
    (state: RootState) => state.tasksPage.selectedProjectId,
  ],
  (projectsList, selectedProjectId) =>
    projectsList.find((project) => project.id === selectedProjectId),
);

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
