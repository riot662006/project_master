import TaskAltIcon from "@mui/icons-material/TaskAlt";

const Logo = ({ showName = false }: { showName?: boolean }) => {
  return (
    <div className="flex items-center gap-4">
      <TaskAltIcon fontSize="large" className="text-sky-500" />
      <div
        className={`items-center gap-1 text-2xl font-bold ${showName ? "flex" : "hidden"}`}
      >
        <span>Project</span>
        <span className="text-sky-500">Master</span>
      </div>
    </div>
  );
};

export default Logo;
