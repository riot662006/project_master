"use server";
import { getUserByEmail, getVerificationTokenByToken } from "@/lib/db/helper";
import { ChangePasswordSchema } from "@/schemas";
import bcrypt from "bcryptjs";
import * as z from "zod";

import prisma from "@/lib/prisma";

export const changePassword = async (
  token: string,
  values: z.infer<typeof ChangePasswordSchema>,
) => {
  if (!token) return { error: "Missing token!" };

  const verifiedToken = await getVerificationTokenByToken(token);

  if (!verifiedToken || verifiedToken.type === "verify_email") {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(verifiedToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  const validatedFields = ChangePasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { password } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const existingUser = await getUserByEmail(verifiedToken.email);

  if (!existingUser) {
    return { error: "Email does not exist!" };
  }

  await prisma.user.update({
    where: { id: existingUser.id },
    data: {
      emailVerified: new Date(),
      email: verifiedToken.email,
      password: hashedPassword,
    },
  });

  await prisma.verificationToken.delete({
    where: { id: verifiedToken.id },
  });

  return { success: "Password changed successfully!" };
};

export const verifyToken = async (token: string) => {
  if (!token) return { error: "Missing token!" };
  const verifiedToken = await getVerificationTokenByToken(token);

  if (!verifiedToken || verifiedToken.type === "verify_email") {
    return { error: "Invalid token!" };
  }

  const hasExpired = new Date(verifiedToken.expires) < new Date();
  if (hasExpired) return { error: "Token has expired!" };

  return {};
};
