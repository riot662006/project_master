import { AppDispatch, RootState } from "@/store";
import { useFetchProjectsQuery } from "@/store/slices/apiSlice";
import { ProjectSortMode } from "@/utils/types";
import { useDispatch, useSelector } from "react-redux";
import { selectProjectsV2 } from "@/store/Selectors";

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export const useProjects = () => {
  const userId = useAppSelector((state) => state.user.userId);

  const {
    isLoading,
    error,
    data: projects,
  } = useFetchProjectsQuery(userId, {
    skip: !userId,
  });

  return { isLoading, error, projects };
};

export const useSortedProjects = (
  sortBy?: ProjectSortMode,
  reverse = false,
) => {
  const userId = useAppSelector((state) => state.user.userId);

  const { isLoading, isFetching, error } = useFetchProjectsQuery(userId, {
    skip: !userId,
  });

  const projects = useAppSelector(selectProjectsV2(sortBy, reverse));

  return { userId, projects, isLoading, isFetching, error };
};
