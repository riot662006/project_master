"use client";

import { Provider } from "react-redux";
import store from "..";
import { useAppDispatch } from "@/hooks/storeHooks";
import { fetchProjects } from "../slices/projectsSlice";
import { useEffect } from "react";
import { ClerkProvider } from "@clerk/nextjs";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <ClerkProvider>
      <Provider store={store}>
        <ProjectFetcher>{children}</ProjectFetcher>
      </Provider>
    </ClerkProvider>
  );
}

const ProjectFetcher = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return <>{children}</>;
};
