import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const PUT = async (
  req: NextRequest,
  { params }: { params: { id: string } },
) => {
  const { userId } = getAuth(req);
  const projectId = params.id;

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: User not authenticated" },
      { status: 401 },
    );
  }
  const data = await req.json();

  try {
    const existingProject = await prisma.project.findUnique({
      where: { id: projectId },
    });

    if (!existingProject || existingProject.clerkUserId !== userId) {
      return NextResponse.json(
        { error: "Forbidden: You don't have access to this project" },
        { status: 403 },
      );
    }

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
    console.error("Failed to update project:", error);
    return NextResponse.json(
      { error: "Failed to update project" },
      { status: 500 },
    );
  }
};
