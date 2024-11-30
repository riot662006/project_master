import { NextRequest, NextResponse } from "next/server";
import prisma from "@/lib/prisma";
import { getAuthenticatedUser, handleApiError } from "@/lib/api/helper";
import { BadRequestError } from "@/lib/api/errors";

export const GET = async (
  req: NextRequest,
  { params }: { params: { projectId: string } },
) => {
  try {
    const { userId } = getAuthenticatedUser(req);

    throw new BadRequestError();
  } catch (error) {
    handleApiError(error);
  }
};

export const POST = async (
  req: NextRequest,
  { params }: { params: { projectId: string } },
) => {
  try {
    const { userId } = getAuthenticatedUser(req);

    throw new BadRequestError();
  } catch (error) {
    handleApiError(error);
  }
};
