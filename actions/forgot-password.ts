"use server";

import { getUserByEmail } from "@/lib/db/helper";
import {
  generateVerificationToken,
  sendVerificationEmail,
} from "@/lib/token/helper";
import { ForgotPasswordSchema } from "@/schemas";
import * as z from "zod";

export const forgotPassword = async (
  values: z.infer<typeof ForgotPasswordSchema>,
) => {
  const validatedFields = ForgotPasswordSchema.safeParse(values);

  if (!validatedFields.success) {
    return { error: "Invalid fields" };
  }

  const email = validatedFields.data.email;

  const existingUser = await getUserByEmail(email);

  if (existingUser) {
    const changePasswordToken = await generateVerificationToken(
      existingUser.email,
      "change_password",
    );
    await sendVerificationEmail(changePasswordToken);
  }

  return { success: "Email sent!" };
};
