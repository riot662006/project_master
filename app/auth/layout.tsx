const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-full w-full flex-col items-center justify-center bg-slate-50">
      {children}
    </div>
  );
};

export default AuthLayout;
