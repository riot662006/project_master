import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthenticatedUser, handleApiError } from "@/lib/api/helper";

export const GET = async () => {
  try {
    const { userId } = await getAuthenticatedUser();

    const projects = await prisma.project.findMany({
      where: { ownerId: userId },
      include: {
        tasks: {
          orderBy: { title: "asc" },
          include: { project: { select: { title: true } } },
        },
      },
      orderBy: {
        title: "asc",
      },
    });

    return NextResponse.json(projects);
  } catch (error) {
    return handleApiError(error, "Failed to fetch projects");
  }
};

export const POST = async (req: NextRequest) => {
  try {
    const { userId } = await getAuthenticatedUser();

    const { title, icon } = await req.json();

    const project = await prisma.project.create({
      data: {
        title,
        icon,
        ownerId: userId,
      },
      include: {
        tasks: {
          orderBy: { title: "asc" },
          include: { project: { select: { title: true } } },
        },
      },
    });

    return NextResponse.json(project);
  } catch (error) {
    return handleApiError(error, "Failed to create project");
  }
};
