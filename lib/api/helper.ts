import { auth } from "@/auth";
import prisma from "../prisma";
import { ApiError, ForbiddenError, UnauthorizedError } from "./errors";
import { NextResponse } from "next/server";

export const getAuthenticatedUser = async (): Promise<{ userId: string }> => {
  const session = await auth();
  if (!session?.user.id) throw new UnauthorizedError();

  return { userId: session.user.id };
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

  if (!project || project.ownerId !== userId) {
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
      task.project.ownerId !== projectOrUserId)
  ) {
    throw new ForbiddenError();
  }
  return task;
}
