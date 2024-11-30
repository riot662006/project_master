import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  getAuthenticatedUser,
  handleApiError,
  verifyProjectOwnership,
} from "@/lib/api/helper";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  try {
    const { userId } = getAuthenticatedUser(req);
    const projectId = params.id;
    await verifyProjectOwnership(projectId, userId);

    const data = await req.json();
    const updatedProject = await prisma.project.update({
      where: { id: projectId },
      data: {
        title: data.title,
        icon: data.icon,
      },
      include: { tasks: true },
    });

    return NextResponse.json(updatedProject);
  } catch (error) {
    handleApiError(error, "Failed to update project");
  }
};

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } },
) {
  try {
    const { userId } = getAuthenticatedUser(req); // Authenticate the user
    const projectId = params.id;
    await verifyProjectOwnership(projectId, userId);

    // Delete the project
    await prisma.project.delete({
      where: { id: projectId },
    });

    return NextResponse.json({ projectId });
  } catch (error) {
    handleApiError(error, "Failed to delete project");
  }
}
