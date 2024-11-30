// apiSlice.ts
import { SerializableProject } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api", // A unique name for the slice
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }), // Base URL for all endpoints
  tagTypes: ["Project", "Task"], // Used for cache invalidation
  endpoints: (builder) => ({
    // Fetch Projects
    fetchProjects: builder.query({
      query: (userId) => `projects?userId=${userId}`,
      providesTags: (result: SerializableProject[] | null | undefined) =>
        result
          ? result.map(({ id }) => ({ type: "Project", id }))
          : ["Project"],
    }),

    // Add a Project
    addProject: builder.mutation({
      query: (projectDetails) => ({
        url: `projects`,
        method: "POST",
        body: projectDetails,
      }),
      invalidatesTags: ["Project"], // Invalidates cache for projects
    }),

    // Update a Project
    updateProject: builder.mutation({
      query: ({ projectId, ...projectDetails }) => ({
        url: `projects/${projectId}`,
        method: "PUT",
        body: projectDetails,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId },
      ],
    }),

    // Delete a Project
    deleteProject: builder.mutation({
      query: (projectId) => ({
        url: `projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
      ],
    }),

    // Delete a Task
    deleteTask: builder.mutation<void, { projectId: string; taskId: string }>({
      query: ({ projectId, taskId }) => ({
        url: `projects/${projectId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId }, // Invalidate the cache for the project
      ],
    }),
  }),
});

export const {
  useFetchProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useDeleteTaskMutation,
} = apiSlice;

export default apiSlice.reducer;
