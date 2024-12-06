"use server";

import bcrypt from "bcryptjs";

import * as z from "zod";
import { RegisterSchema } from "@/schemas";

import prisma from "@/lib/prisma";
import { getUserByEmail } from "@/lib/db/helper";
import { generateVerificationToken } from "@/lib/token/helper";

export const register = async (values: z.infer<typeof RegisterSchema>) => {
  const validatedFields = RegisterSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const { email, password, name } = validatedFields.data;
  const hashedPassword = await bcrypt.hash(password, 10);

  const user = await getUserByEmail(email);

  if (user) return { error: "Email already in use" };

  await prisma.user.create({
    data: {
      name,
      email,
      password: hashedPassword,
    },
  });

  const verificationToken = await generateVerificationToken(email);

  return { success: "Confirmation email sent!" };
};
