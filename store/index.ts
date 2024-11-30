import { configureStore, combineReducers } from "@reduxjs/toolkit";

import apiReducer, { apiSlice } from "./slices/apiSlice";
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

  // experimental
  user: userReducer,
  api: apiReducer,
  projectsUI: projectsUIReducer,
});

// Enhanced root reducer to handle RESET_STATE action
const rootReducer = (
  state: ReturnType<typeof appReducer> | undefined,
  action: any,
) => {
  if (action.type === "RESET_STATE") {
    // Return undefined to reset all slices to their initial state
    return appReducer(undefined, action);
  }
  return appReducer(state, action);
};

// Configure store with the enhanced root reducer
const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(apiSlice.middleware),
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
