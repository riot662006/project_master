"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { selectTasks } from "@/store/Selectors";
import {
  setView,
} from "@/store/slices/tasksPageSlice";
import { Priority, Status, TaskObj } from "@/utils/types";
import {
  Cached,
  CheckBox,
  CheckBoxOutlineBlank,
  DeleteOutline,
  EditOutlined,
  LayersClear,
  List,
} from "@mui/icons-material";

const getProgressSpanMsg: { [key in Status]: string } = {
  pending: "Pending",
  in_progress: "In Progress",
  completed: "Completed",
};

const getProrityMsgObj: { [key in Priority]: { name: string; color: string } } =
  {
    low: { name: "Low", color: "bg-green-600" },
    medium: { name: "Medium", color: "bg-yellow-600" },
    high: { name: "High", color: "bg-red-600" },
  };

const TaskList = () => {
  const dispatch = useAppDispatch();

  const selectedProjectId = useAppSelector((state) => state.tasksPage.selectedProjectId);
  const curView = useAppSelector((state) => state.tasksPage.curView);
  const taskObjs = useAppSelector(selectTasks(selectedProjectId))

  const completedTasks = taskObjs.filter((taskObj) => taskObj.task.status === "completed");
  const ongoingTasks = taskObjs.filter((taskObj) => taskObj.task.status !== "completed");

  const displayedTasks = (curView == 'on-going') ? ongoingTasks : completedTasks;

  return (
    <div className="flex h-full flex-col pl-12 max-sm:pl-0">
      <div className="flex items-center gap-8 py-8">
        <button
          className="flex items-center gap-2 text-xs font-semibold"
          onClick={() => {
            dispatch(setView("on-going"));
          }}
        >
          <span
            className={
              curView == "on-going" ? "text-sky-400" : "text-slate-300"
            }
          >
            On Going Tasks
          </span>
          <span
            className={`rounded-md ${curView == "on-going" ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-400"} px-2 py-0.5`}
          >
            {ongoingTasks.length}
          </span>
        </button>

        <button
          className="flex items-center gap-2 text-xs font-semibold"
          onClick={() => {
            dispatch(setView("completed"));
          }}
        >
          <span
            className={
              curView == "completed" ? "text-sky-400" : "text-slate-300"
            }
          >
            Completed Tasks
          </span>
          <span
            className={`rounded-md ${curView == "completed" ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-400"} px-2 py-0.5`}
          >
            {completedTasks.length}
          </span>
        </button>
      </div>
      {displayedTasks.length == 0 ? (
        <div className="flex h-full w-full flex-col items-center justify-center p-16 text-slate-300">
          <LayersClear sx={{ fontSize: "10rem" }} />
          <span>No tasks here...</span>
        </div>
      ) : (
        <ul className="flex w-full flex-col gap-4">
          {displayedTasks.map((taskObj) => (
            <TaskItem key={taskObj.task.id} taskObj={taskObj} />
          ))}
        </ul>
      )}
    </div>
  );
};

const TaskItem = ({ taskObj }: { taskObj: TaskObj }) => {
  return (
    <li className="flex w-full items-center gap-4">
      {true ? <CheckBoxOutlineBlank /> : <CheckBox />}
      <div className="flex w-full items-center gap-2 rounded-r-xl bg-white p-4">
        {/* Icon */}
        <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-100 text-sky-500">
          <List sx={{ fontSize: "18px" }} />
        </div>
        {/* Task Titles */}
        <div className="flex flex-grow flex-col gap-1">
          <p className="flex max-w-[60%] items-center text-sm font-bold">
            {taskObj.task.title}
          </p>
          <p className="text-xs text-slate-400">{taskObj.projectName}</p>
        </div>
        <div className="flex items-center">
          {/* Progress */}
          <div className="flex w-32 items-center justify-center gap-1 text-slate-400 max-sm:hidden">
            <Cached fontSize="small" />
            <span className="text-sm font-medium">
              {getProgressSpanMsg[taskObj.task.status]}
            </span>
          </div>
          {/* Priority */}
          <div className="flex w-20 items-center gap-1 text-slate-400 max-sm:hidden">
            <div
              className={`aspect-square w-2 rounded-full ${getProrityMsgObj[taskObj.task.priority].color}`}
            />
            <span className="text-sm font-medium">
              {getProrityMsgObj[taskObj.task.priority].name}
            </span>
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

export default TaskList;
