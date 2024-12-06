"use client";

import { Avatar } from "@mui/material";
import { signOut, useSession } from "next-auth/react";
import { useEffect } from "react";

const UserButton = () => {
  const { data: session, status, update } = useSession();

  useEffect(() => {
    if (status === "unauthenticated") {
      update()
        .then(() => {})
        .catch(console.error);
    }
  }, [status, update]);

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
