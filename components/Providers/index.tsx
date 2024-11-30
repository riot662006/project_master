"use client";

import { Provider } from "react-redux";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import store from "@/store";
import { fetchProjects } from "@/store/slices/projectsSlice";

import { useAppDispatch } from "@/hooks/storeHooks";
import { useEffect } from "react";
import { clearUserId, setUserId } from "@/store/slices/userSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <UserProvider>
          <ProjectManager>{children}</ProjectManager>
        </UserProvider>
      </Provider>
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

const ProjectManager = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isSignedIn, user } = useUser();

  useEffect(() => {
    // Fetch projects when user is signed in
    if (isSignedIn && user?.id) {
      dispatch(fetchProjects(user.id));
    }

    // Cleanup: Clear projects when component unmounts or user changes
    return () => {
      dispatch({ type: "RESET_STATE" });
    };
  }, [dispatch, isSignedIn, user?.id]);

  return <>{children}</>;
};
