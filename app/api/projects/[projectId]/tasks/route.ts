import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import {
  getAuthenticatedUser,
  handleApiError,
  verifyProjectOwnership,
} from "@/lib/api/helper";

// export const GET = async (
//   req: NextRequest,
//   { params }: { params: { projectId: string } },
// ) => {
//   try {
//     const { userId } = getAuthenticatedUser(req);

//     throw new BadRequestError();
//   } catch (error) {
//     handleApiError(error);
//   }
// };

export const POST = async (
  req: NextRequest,
  { params }: { params: { projectId: string } },
) => {
  try {
    const { userId } = getAuthenticatedUser(req);
    const { projectId } = params;
    await verifyProjectOwnership(projectId, userId);

    const { title, icon, priority } = await req.json();

    const task = await prisma.task.create({
      data: {
        title,
        icon,
        priority,
        projectId,
      },
      include: { project: { select: { title: true } } },
    });

    return NextResponse.json(task);
  } catch (error) {
    handleApiError(error);
  }
};
