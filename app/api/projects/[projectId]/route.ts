import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  getAuthenticatedUser,
  handleApiError,
  verifyProjectOwnership,
} from "@/lib/api/helper";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { projectId: string } },
) => {
  try {
    const { userId } = getAuthenticatedUser(req); // Authenticate the user
    const { projectId } = params;

    // Verify ownership of the project
    await verifyProjectOwnership(projectId, userId);

    // Parse request body
    const data = await req.json();
    const { title, icon } = data;

    // Update the project
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title,
        icon,
      },
      include: {
        tasks: {
          orderBy: { title: "asc" }, // Ensure tasks are sorted by title
          include: {
            project: { select: { title: true } }, // Include project title in tasks
          },
        },
      },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    return handleApiError(error, "Failed to update project");
  }
};

export const DELETE = async (
  req: NextRequest,
  { params }: { params: { projectId: string } },
) => {
  try {
    const { userId } = getAuthenticatedUser(req); // Authenticate the user
    const { projectId } = params;

    // Verify ownership of the project
    await verifyProjectOwnership(projectId, userId);

    // Delete the project
    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ projectId });
  } catch (error) {
    return handleApiError(error, "Failed to delete project");
  }
};
