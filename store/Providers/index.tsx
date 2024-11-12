"use client";

import { Provider } from "react-redux";
import store from "..";
import { useAppDispatch } from "@/hooks/storeHooks";
import { fetchProjects } from "../slices/projectsSlice";
import { useEffect } from "react";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <Provider store={store}>
      <ProjectFetcher>{children}</ProjectFetcher>
    </Provider>
  );
}

const ProjectFetcher = ({ children }: { children: React.ReactNode }) => {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchProjects());
  }, [dispatch]);

  return <>{children}</>;
};
