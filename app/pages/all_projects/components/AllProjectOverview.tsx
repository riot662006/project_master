import Splitscreen from "@mui/icons-material/Splitscreen";

const AllProjectsOverview = () => {
  return (
    <div className="flex h-full w-full flex-col items-center gap-6 rounded-2xl bg-white p-8">
      <h2 className="font-bold">Projects Completed</h2>
      <ProjectProgressCircle />

      {/* Labels */}
      <div className="flex flex-col items-center gap-1">
        <p className="text-sm font-semibold">3 Completed</p>
        <p className="text-[10px] text-slate-400">20 Tasks done</p>
      </div>

      <ProjectsList />
    </div>
  );
};

const ProjectProgressCircle = () => {
  return (
    <div className="flex items-center justify-center">
      <div className="flex h-40 w-40 items-center justify-center rounded-full bg-slate-100">
        <div className="flex h-[86%] w-[86%] items-center justify-center rounded-full bg-white">
          <span className="text-xl font-semibold text-sky-500">90%</span>
        </div>
      </div>
    </div>
  );
};

const ProjectsList = () => {
  return (
    <ul className="flex w-full flex-col items-center gap-5 overflow-auto">
      <SingleProject />
      <hr className="w-[80%]" />
      <SingleProject />
      <hr className="w-[80%]" />
      <SingleProject />
      <hr className="w-[80%]" />
      <SingleProject />
    </ul>
  );
};

const SingleProject = () => {
  return (
    <li className="flex w-full gap-2">
      <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-500">
        <Splitscreen sx={{ fontSize: "18px" }} className="text-white" />
      </div>
      <div className="flex flex-col">
        <p className="text-xs font-semibold">Project 1</p>
        <p className="text-[10px] text-slate-400">3 Tasks</p>
      </div>
    </li>
  );
};

export default AllProjectsOverview;
