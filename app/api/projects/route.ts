import { getAuth } from "@clerk/nextjs/server";
import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";

export const GET = async (req: NextRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: User not authenticated" },
      { status: 401 },
    );
  }

  const url = new URL(req.url);
  const requestedUserId = url.searchParams.get("userId");

  if (!requestedUserId || requestedUserId !== userId) {
    return NextResponse.json(
      { error: "Forbidden: Access to this resource is denied" },
      { status: 403 },
    );
  }

  try {
    const projects = await prisma.project.findMany({
      where: { clerkUserId: userId },
      include: { tasks: true },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to fetch projects" },
      { status: 500 },
    );
  }
};

export const POST = async (req: NextRequest) => {
  const { userId } = getAuth(req);

  if (!userId) {
    return NextResponse.json(
      { error: "Unauthorized: User not authenticated" },
      { status: 401 },
    );
  }

  const { title, icon } = await req.json();

  try {
    const project = await prisma.project.create({
      data: {
        title,
        icon,
        clerkUserId: userId,
      },
      include: {
        tasks: true,
      }
    });

    return NextResponse.json(project);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to create project" },
      { status: 500 },
    );
  }
};
