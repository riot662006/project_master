import { SerializableProject, SerializableTask } from "@/utils/types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["Project", "Task"], // Cache tags for invalidation
  endpoints: (builder) => ({
    // Fetch all projects, including tasks
    fetchProjects: builder.query<SerializableProject[], void>({
      query: () => "projects",
      providesTags: (result) =>
        result
          ? [
              ...result.map(({ id }) => ({ type: "Project", id }) as const),
              "Project",
            ]
          : ["Project"],
    }),

    // Add a new project
    addProject: builder.mutation<
      SerializableProject,
      { title: string; status?: string }
    >({
      query: (newProject) => ({
        url: "projects",
        method: "POST",
        body: newProject,
      }),
      invalidatesTags: ["Project"], // Refetch all projects on addition
    }),

    // Update an existing project
    updateProject: builder.mutation<
      SerializableProject,
      { projectId: string; title?: string; status?: string }
    >({
      query: ({ projectId, ...updatedData }) => ({
        url: `projects/${projectId}`,
        method: "PUT",
        body: updatedData,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId },
      ],
    }),

    // Delete a project
    deleteProject: builder.mutation<void, string>({
      query: (projectId) => ({
        url: `projects/${projectId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, projectId) => [
        { type: "Project", id: projectId },
      ],
    }),

    // Add a new task to a project
    addTask: builder.mutation<
      SerializableTask,
      { projectId: string; title: string; status?: string; priority?: string }
    >({
      query: ({ projectId, ...taskData }) => ({
        url: `projects/${projectId}/tasks`,
        method: "POST",
        body: taskData,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId },
      ],
    }),

    // Update an existing task
    updateTask: builder.mutation<
      SerializableTask,
      {
        projectId: string;
        taskId: string;

        updatedFields: {
          title?: string;
          status?: string;
          priority?: string;
          projectId?: string;
        };
      }
    >({
      query: ({ projectId, taskId, updatedFields }) => ({
        url: `projects/${projectId}/tasks/${taskId}`,
        method: "PUT",
        body: updatedFields,
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId },
      ],
    }),

    // Delete a task
    deleteTask: builder.mutation<void, { projectId: string; taskId: string }>({
      query: ({ projectId, taskId }) => ({
        url: `projects/${projectId}/tasks/${taskId}`,
        method: "DELETE",
      }),
      invalidatesTags: (result, error, { projectId }) => [
        { type: "Project", id: projectId },
      ],
    }),
  }),
});

export const {
  useFetchProjectsQuery,
  useAddProjectMutation,
  useUpdateProjectMutation,
  useDeleteProjectMutation,
  useAddTaskMutation,
  useUpdateTaskMutation,
  useDeleteTaskMutation,
} = apiSlice;

export default apiSlice.reducer;
