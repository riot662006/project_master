import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "..";

interface TaskPageState {
  selectedProjectId: string;
}

const initialState: TaskPageState = {
  selectedProjectId: "1",
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
  },
});

export const { setSelectedProject } = taskPageSlice.actions;
export default taskPageSlice.reducer;
