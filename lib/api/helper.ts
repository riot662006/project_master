import { getAuth } from "@clerk/nextjs/server";
import { ApiError, ForbiddenError, UnauthorizedError } from "./errors";
import { NextRequest, NextResponse } from "next/server";

import prisma from "../prisma";

export const getAuthenticatedUser = (req: NextRequest): { userId: string } => {
  const { userId } = getAuth(req);

  if (!userId) {
    throw new UnauthorizedError();
  }

  return { userId };
};

export const handleApiError = (
  error: unknown,
  fallbackMsg: string = "An unexpected error occurred",
): NextResponse<{
  error: string;
}> => {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  }
  console.error("Unexpected error: ", error);
  return NextResponse.json({ error: fallbackMsg }, { status: 500 });
};

export const verifyProjectOwnership = async (
  projectId: string,
  userId: string,
) => {
  const project = await prisma.project.findUnique({ where: { id: projectId } });

  if (!project || project.clerkUserId !== userId) {
    throw new ForbiddenError();
  }
  return project;
};

export async function verifyTaskOwnership(
  taskId: string,
  projectOrUserId: string,
) {
  const task = await prisma.task.findUnique({
    where: { id: taskId },
    include: { project: true },
  });

  if (
    !task ||
    (task.projectId !== projectOrUserId &&
      task.project.clerkUserId !== projectOrUserId)
  ) {
    throw new ForbiddenError();
  }
  return task;
}
