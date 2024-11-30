"use client";

import { Provider as StorageProvider } from "react-redux";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import store from "@/store";
import { fetchProjects } from "@/store/slices/projectsSlice";

import { useAppDispatch } from "@/hooks/useStoreHooks";
import { useEffect } from "react";
import { clearUserId, setUserId } from "@/store/slices/userSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <StorageProvider store={store}>
        <UserProvider>{children}</UserProvider>
      </StorageProvider>
    </ClerkProvider>
  );
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { isSignedIn, user } = useUser();
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (isSignedIn && user?.id) {
      dispatch(setUserId(user.id));
    } else {
      dispatch(clearUserId());
    }
  }, [isSignedIn, user, dispatch]);

  return <>{children}</>;
};
