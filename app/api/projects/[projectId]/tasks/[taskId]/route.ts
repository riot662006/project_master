import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  getAuthenticatedUser,
  handleApiError,
  verifyProjectOwnership,
  verifyTaskOwnership,
} from "@/lib/api/helper";
import { BadRequestError } from "@/lib/api/errors";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { projectId: string; taskId: string } },
) => {
  try {
    const { userId } = getAuthenticatedUser(req);
    const { projectId, taskId } = params;
    await verifyProjectOwnership(projectId, userId);
    await verifyTaskOwnership(taskId, projectId);

    const { title, icon, priority, projectId: newProjectId } = await req.json();

    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        icon,
        priority,
        projectId: newProjectId,
      },
    });

    return NextResponse.json(task);
  } catch (error) {
    return handleApiError(error);
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { projectId: string; taskId: string } },
) => {
  try {
    const { userId } = getAuthenticatedUser(req);

    throw new BadRequestError();
  } catch (error) {
    handleApiError(error);
  }
};