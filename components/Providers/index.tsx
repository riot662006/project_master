"use client";

import { Provider as StorageProvider } from "react-redux";
import store from "@/store";

import { useAppDispatch } from "@/hooks/useStoreHooks";
import { useEffect } from "react";
import { clearUserId, setUserId } from "@/store/slices/userSlice";
import { SessionProvider, useSession } from "next-auth/react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <SessionProvider>
      <StorageProvider store={store}>
        <UserProvider>{children}</UserProvider>
      </StorageProvider>
    </SessionProvider>
  );
}

const UserProvider = ({ children }: { children: React.ReactNode }) => {
  const { data: session } = useSession();

  const dispatch = useAppDispatch();

  useEffect(() => {
    if (session?.user?.id) {
      dispatch(setUserId(session?.user.id));
    } else {
      dispatch(clearUserId());
    }
  }, [dispatch, session]);

  return <>{children}</>;
};
