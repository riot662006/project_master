import { useProjects } from "@/hooks/useStoreHooks";
import { CircularProgress } from "@mui/material";

const LoadingOverlay = () => {
  const { isFetching } = useProjects();

  if (!isFetching) return null;

  return (
    <div className="absolute left-0 top-0 z-40 flex h-full w-full items-center justify-center bg-slate-200/30">
      <CircularProgress size="5rem" sx={{ color: "skyblue" }} />
    </div>
  );
};

export default LoadingOverlay;
