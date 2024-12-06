"use server";

import { signOut } from "@/auth";

export const signOutAction = async () => {
  try {
    console.log("Attempting to sign out");
    await signOut({ redirect: true, redirectTo: "/auth/login" });
  } catch {
    return { error: "Something went wrong" };
  }
};
