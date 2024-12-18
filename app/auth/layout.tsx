import { CircularProgress } from "@mui/material";
import { Suspense } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50">
      <Suspense
        fallback={<CircularProgress size="4rem" sx={{ color: "skyblue" }} />}
      >
        {children}
      </Suspense>
    </div>
  );
};

export default AuthLayout;
