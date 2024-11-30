import { configureStore, combineReducers } from "@reduxjs/toolkit";

import { apiSlice } from "./slices/apiSlice";
import userReducer from "./slices/userSlice";
import sidebarReducer from "./slices/sidebarSlice";
import addProjectModalReducer from "./slices/addProjectModalSlice";
import addTaskModalReducer from "./slices/addTaskModalSlice";
import confirmDeleteModalReducer from "./slices/confirmDeleteModalSlice";
import tasksUIReducer from "./slices/tasksUISlice";
import projectsUIReducer from "./slices/projectsUISlice";

// Combine all reducers into a single root reducer
const appReducer = combineReducers({
  sidebar: sidebarReducer,
  addProjectModal: addProjectModalReducer,
  addTaskModal: addTaskModalReducer,
  confirmDeleteModal: confirmDeleteModalReducer,
  tasksPage: tasksUIReducer,
  user: userReducer,
  api: apiSlice.reducer,
  projectsUI: projectsUIReducer,
});

// Configure store directly with appReducer
const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;

// Infer types for state and dispatch
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
