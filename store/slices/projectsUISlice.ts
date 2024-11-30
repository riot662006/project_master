import { ProjectSortMode } from "@/utils/types";
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ProjectSortState {
  mode: ProjectSortMode;
  reverse: boolean;
}

interface ProjectsUIState {
  sortState: ProjectSortState;
}

const projectsUISlice = createSlice({
  name: "projectsUI",
  initialState: {
    sortState: { mode: "date", reverse: true },
  } as ProjectsUIState,
  reducers: {
    setSortState: (state, action: PayloadAction<ProjectSortState>) => {
      state.sortState = action.payload;
    },
  },
});

export const { setSortState } = projectsUISlice.actions;
export default projectsUISlice.reducer;
