import {
  Cached,
  CheckBox,
  DeleteOutline,
  EditOutlined,
  List,
} from "@mui/icons-material";

const TasksPanel = () => {
  return (
    <div className="flex flex-col pl-12 max-sm:pl-0">
      <TasksFilter />
      <TaskList />
    </div>
  );
};

const TasksFilter = () => {
  return (
    <div className="flex items-center gap-8 py-8">
      <div className="flex items-center gap-2 text-xs font-semibold">
        <span className="text-sky-400">On Going Tasks</span>
        <span className="rounded-md bg-sky-500 px-2 py-0.5 text-white">
          7
        </span>
      </div>

      <div className="flex items-center gap-2 text-xs font-semibold">
        <span className="text-slate-300">Completed Tasks</span>
        <span className="rounded-md bg-slate-200 px-2 py-0.5 text-slate-400">
          7
        </span>
      </div>
    </div>
  );
};

const TaskList = () => {
  return (
    <ul className="flex w-full flex-col gap-4">
      <TaskItem />
      <TaskItem />
    </ul>
  );
};

const TaskItem = () => {
  return (
    <li className="flex w-full items-center gap-4">
      <CheckBox />
      <div className="flex w-full items-center gap-2 rounded-r-xl bg-white p-4">
        {/* Icon */}
        <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-100 text-sky-500">
          <List sx={{ fontSize: "18px" }} />
        </div>
        {/* Task Titles */}
        <div className="flex flex-grow flex-col gap-1">
          <p className="flex max-w-[60%] items-center text-sm font-bold">
            Create the UI Design of the task
          </p>
          <p className="text-xs text-slate-400">Project</p>
        </div>
        <div className="flex items-center">
          {/* Progress */}
          <div className="flex w-32 items-center justify-center gap-1 text-slate-400 max-sm:hidden">
            <Cached fontSize="small" />
            <span className="text-sm font-medium">In Progress</span>
          </div>
          {/* Priority */}
          <div className="flex w-20 items-center justify-center gap-1 text-slate-400 max-sm:hidden">
            <div className="aspect-square w-2 rounded-full bg-green-700" />
            <span className="text-sm font-medium">Low</span>
          </div>
        </div>
        <div className="flex items-center gap-2 max-lg:flex-col">
          {/* Edit */}
          <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-100 text-sky-500">
            <EditOutlined sx={{ fontSize: "18px" }} />
          </div>

          {/* Trash */}
          <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-slate-200 text-slate-600">
            <DeleteOutline sx={{ fontSize: "18px" }} />
          </div>
        </div>
      </div>
    </li>
  );
};

export default TasksPanel;
