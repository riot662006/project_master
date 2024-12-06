import { auth } from "@/auth";
import { ApiError, UnauthorizedError } from "./errors";
import { NextResponse } from "next/server";

export const getAuthenticatedUser = async (): Promise<{ userId: string }> => {
  const session = await auth();
  if (!session?.user.id) throw new UnauthorizedError();

  return { userId: session.user.id };
};

export const handleApiError = (
  error: unknown,
  fallbackMsg: string = "An unexpected error occurred",
): NextResponse<{
  error: string;
}> => {
  if (error instanceof ApiError) {
    return NextResponse.json(
      { error: error.message },
      { status: error.status },
    );
  }
  console.error("Unexpected error: ", error);
  return NextResponse.json({ error: fallbackMsg }, { status: 500 });
};
