import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthenticatedUser, handleApiError } from "@/lib/api/helper";
import { ForbiddenError } from "@/lib/api/errors";

export const GET = async (req: NextRequest) => {
  try {
    const { userId } = getAuthenticatedUser(req);

    const url = new URL(req.url);

    const projects = await prisma.project.findMany({
      where: { clerkUserId: userId },
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
    const { userId } = getAuthenticatedUser(req);

    const { title, icon } = await req.json();

    const project = await prisma.project.create({
      data: {
        title,
        icon,
        clerkUserId: userId,
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
