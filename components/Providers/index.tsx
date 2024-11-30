"use client";

import { Provider } from "react-redux";
import { ClerkProvider, useUser } from "@clerk/nextjs";
import store from "@/store";
import { fetchProjects } from "@/store/slices/projectsSlice";

import { useAppDispatch } from "@/hooks/storeHooks";
import { useEffect } from "react";
import { useFetchProjectsQuery } from "@/store/slices/apiSlice";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <ProjectManager>{children}</ProjectManager>
      </Provider>
    </ClerkProvider>
  );
}

const ProjectManager = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();
  const { isSignedIn, user } = useUser();

  const userId = isSignedIn && user?.id ? user.id : null;
  const {
    isLoading,
    isFetching,
    error,
    data: projects,
  } = useFetchProjectsQuery(userId ?? "", {
    skip: !userId,
  });

  useEffect(() => {
    console.log(projects);
  }, [projects]);

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
