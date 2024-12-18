import { v4 as uuidv4 } from "uuid";
import { getVerificationTokenByEmail } from "../db/helper";
import nodemailer from "nodemailer";

import prisma from "../prisma";
import { TokenType, VerificationToken } from "@prisma/client";

const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE,
  host: process.env.EMAIL_HOST,
  port: 587,
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD,
  },
});

export const generateVerificationToken = async (
  email: string,
  type: TokenType,
) => {
  const token = uuidv4();
  const expires = new Date(new Date().getTime() + 3600 * 1000); // Expires in an hour

  const existingToken = await getVerificationTokenByEmail(email);

  if (existingToken) {
    await prisma.verificationToken.delete({
      where: { id: existingToken.id },
    });
  }

  const verificationToken = await prisma.verificationToken.create({
    data: {
      email,
      token,
      expires,
      type,
    },
  });

  return verificationToken;
};

export const sendVerificationEmail = async (
  verificationToken: VerificationToken,
) => {
  // Dynamically determine the app URL with fallback
  const appUrl =
    process.env.NEXT_PUBLIC_APP_URL ||
    (typeof window !== "undefined" ? window.location.origin : "");

  if (!appUrl) {
    throw new Error(
      "Need to set NEXT_PUBLIC_APP_URL or ensure window.location.origin is available to create magic links (app root URL without ending slashes)",
    );
  }

  // Construct the confirmation link
  const confirmLink = `${appUrl}/auth/${
    verificationToken.type === "verify_email"
      ? "new-verification"
      : "change-password"
  }?token=${verificationToken.token}`;

  // Send the email using the transporter
  const mail = await transporter.sendMail({
    from: "Project Master <noreply@pjmaster.com>",
    to: verificationToken.email,
    subject:
      verificationToken.type === "verify_email"
        ? "Confirm your email"
        : "Change your password",
    html: `<p>Click <a href="${confirmLink}">here</a> to ${
      verificationToken.type === "verify_email"
        ? "confirm email"
        : "change password"
    }.</p>`,
  });

  console.log("Message sent: %s", mail.messageId);
};
