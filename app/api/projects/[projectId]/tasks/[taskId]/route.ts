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

    const { title, icon, status, priority, projectId: newProjectId } = await req.json();
    
    const task = await prisma.task.update({
      where: {
        id: taskId,
      },
      data: {
        title,
        icon,
        priority,
        status,
        projectId: newProjectId,
      },
      include: { project: { select: { title: true } } },
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
    const { projectId, taskId } = params;
    await verifyTaskOwnership(taskId, userId);

    await prisma.task.delete({
      where: { id: taskId },
    });

    return NextResponse.json({ taskId });
  } catch (error) {
    return handleApiError(error);
  }
};
