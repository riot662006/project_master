import { PrismaClient, Priority, Status } from "@prisma/client";
import * as dotenv from "dotenv";

type Task = {
  id: string;
  title: string;
  icon: string;
  priority: Priority;
  createdAt: string;
  updatedAt: string;
  status: Status;
};

type Project = {
  id: string;
  clerkUserId: string;
  title: string;
  icon: string;
  createdAt: string;
  updatedAt: string;
  status: Status;
  tasks: Task[];
};

const exampleProjects: Project[] = [
  {
    id: "1",
    clerkUserId: "123",
    title: "Main project",
    icon: "creative",
    createdAt: "2024-11-04T10:00:00Z",
    updatedAt: "2024-08-26T12:00:00Z",
    status: "in_progress",
    tasks: [
      {
        id: "2",
        title: "Develop the UI Design for the task page",
        icon: "paint",
        priority: "low",
        status: "completed",
        createdAt: "2024-08-26T10:00:00Z",
        updatedAt: "2024-08-26T10:00:00Z",
      },
      {
        id: "3",
        title: "Develop the Backend API",
        icon: "folder",
        priority: "high",
        status: "completed",
        createdAt: "2024-08-26T10:10:00Z",
        updatedAt: "2024-08-26T10:10:00Z",
      },
    ],
  },
  {
    id: "4",
    clerkUserId: "123",
    title: "Project Title",
    icon: "default",
    createdAt: "2024-07-21T09:00:00Z",
    updatedAt: "2024-07-21T09:00:00Z",
    status: "completed",
    tasks: [
      {
        id: "5",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "medium",
        status: "completed",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
      {
        id: "6",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "high",
        status: "completed",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
      {
        id: "7",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "medium",
        status: "completed",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
      {
        id: "8",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "high",
        status: "completed",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
    ],
  },
  {
    id: "9",
    clerkUserId: "123",
    title: "Project Title 2",
    icon: "default",
    createdAt: "2024-11-09T11:00:00Z",
    updatedAt: "2024-11-10T09:00:00Z",
    status: "completed",
    tasks: [
      {
        id: "10",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "high",
        status: "completed",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
      {
        id: "11",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "high",
        status: "pending",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
      {
        id: "12",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "high",
        status: "pending",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
      {
        id: "13",
        title: "Lorem ipsum dolor sit amet, consectetur adipiscing elit,",
        icon: "list",
        priority: "high",
        status: "pending",
        createdAt: "2024-07-21T09:05:00Z",
        updatedAt: "2024-07-21T09:05:00Z",
      },
    ],
  },
];

dotenv.config({ path: ".env.local" });

const prisma = new PrismaClient();

async function main() {
  const clerkUserId = process.env.SEEDING_CLERK_ID;
  if (!clerkUserId) {
    throw new Error(
      "CLERK_USER_ID is not defined in the environment variables.",
    );
  }

  console.log("Seeding database...");

  for (const project of exampleProjects) {
    // Destructure tasks from project
    const {
      id: _id,
      clerkUserId: _clerkUserId,
      tasks,
      ...projectData
    } = project;

    // Create project with nested tasks
    await prisma.project.create({
      data: {
        ...projectData,
        clerkUserId, // Use env variable or fallback
        tasks: {
          create: tasks.map(({ id, ...taskData }) => ({
            ...taskData,
          })),
        },
      },
    });
  }

  console.log("Database seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
