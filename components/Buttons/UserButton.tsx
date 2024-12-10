"use client";

import { Avatar } from "@mui/material";
import { signOut, useSession } from "next-auth/react";

const UserButton = () => {
  const { data: session } = useSession();

  if (session?.user) {
    return (
      <button onClick={() => signOut()}>
        <Avatar />
      </button>
    );
  }

  return <a href="/auth/login">Sign In</a>;
};

export default UserButton;
