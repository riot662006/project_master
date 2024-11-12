import { configureStore } from "@reduxjs/toolkit";

import sidebarReducer from "./slices/sidebarSlice";
import addProjectModalReducer from "./slices/addProjectModalSlice";
import confirmDeleteModalReducer from "./slices/confirmDeleteProjectModalSlice";
import projectsReducer from "./slices/projectsSlice";
import tasksPageReducer from "./slices/tasksPageSlice";

const store = configureStore({
  reducer: {
    sidebar: sidebarReducer,
    addProjectModal: addProjectModalReducer,
    confirmDeleteModal: confirmDeleteModalReducer,
    projects: projectsReducer,
    tasksPage: tasksPageReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
