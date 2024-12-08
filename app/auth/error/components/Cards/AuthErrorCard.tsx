"use client";

import { AuthCardWrapper } from "./AuthCardWrapper";

export const AuthErrorCard = () => {
  return (
    <AuthCardWrapper
      headerTitle="Sign In To Project Master"
      headerSubtitle="Oops! Something went wrong"
      redirectLink="/auth/login"
      redirectTitle="Back to login"
    />
  );
};
