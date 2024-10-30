import { Project } from "./types";

export const exampleProjects: Project[] = [
  {
    id: 1,
    title: "Main project",
    icon: "creative",
    createdAt: "2024-08-26T10:00:00Z",
    updatedAt: "2024-08-26T12:00:00Z",
    status: "in_progress",
    tasks: [
      {
        id: 2,
        title: "Develop the UI Design for the task page",
        icon: "paint",
        priority: "low",
        status: "in_progress",
        createdAt: "2024-08-26T10:00:00Z",
        updatedAt: "2024-08-26T10:00:00Z",
      },
      {
        id: 3,
        title: "Develop the Backend API",
        icon: "folder",
        priority: "high",
        status: "pending",
        createdAt: "2024-08-26T10:10:00Z",
        updatedAt: "2024-08-26T10:10:00Z",
      },
    ],
  },
  {
    id: 4,
    title: "Project Title",
    icon: "default",
    createdAt: "2024-07-21T09:00:00Z",
    updatedAt: "2024-07-21T09:00:00Z",
    status: "completed",
    tasks: [
      {
        id: 5,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "high",
        status: "completed",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
      {
        id: 6,
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "high",
        status: "completed",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
    ],
  },
];
