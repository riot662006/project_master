"use client";

import ProjectIcon from "@/components/ProjectIcon";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { selectTasks } from "@/store/Selectors";
import { openEditTaskModal } from "@/store/slices/addTaskModalSlice";
import { setView, ViewState } from "@/store/slices/tasksPageSlice";
import { Priority, Status, TaskObj } from "@/utils/types";
import {
  Cached,
  Check,
  CheckBox,
  CheckBoxOutlineBlank,
  DeleteOutline,
  EditOutlined,
  LayersClear,
  PendingActions,
} from "@mui/icons-material";
import React from "react";

const getProgressMsgObj: {
  [key in Status]: { msg: string; Icon: React.ElementType };
} = {
  pending: { msg: "Pending", Icon: PendingActions },
  in_progress: { msg: "In Progress", Icon: Cached },
  completed: { msg: "Completed", Icon: Check },
};

const getProrityMsgObj: { [key in Priority]: { name: string; color: string } } =
  {
    low: { name: "Low", color: "bg-green-600" },
    medium: { name: "Medium", color: "bg-yellow-600" },
    high: { name: "High", color: "bg-red-600" },
  };

const TaskList = () => {
  const dispatch = useAppDispatch();

  const selectedProjectId = useAppSelector(
    (state) => state.tasksPage.selectedProjectId,
  );
  const curView = useAppSelector((state) => state.tasksPage.curView);
  const taskObjs = useAppSelector(selectTasks(selectedProjectId));

  const completedTasks = taskObjs.filter(
    (taskObj) => taskObj.task.status === "completed",
  );
  const ongoingTasks = taskObjs.filter(
    (taskObj) => taskObj.task.status !== "completed",
  );

  const options = [
    {
      id: 1,
      name: "All Tasks",
      view: "all" as ViewState,
      displayedTasks: taskObjs,
    },
    {
      id: 2,
      name: "On Going Tasks",
      view: "on-going" as ViewState,
      displayedTasks: ongoingTasks,
    },
    {
      id: 3,
      name: "Completed Tasks",
      view: "completed" as ViewState,
      displayedTasks: completedTasks,
    },
  ];

  const displayedTasks =
    options.find((option) => option.view == curView)?.displayedTasks ??
    taskObjs;

  return (
    <div className="flex h-full flex-col pl-12 max-sm:pl-0">
      <div className="flex items-center gap-8 py-8">
        {options.map((option) => (
          <button
            key={option.id}
            className="flex items-center gap-2 text-xs font-semibold"
            onClick={() => {
              dispatch(setView(option.view));
            }}
          >
            <span
              className={
                option.view === curView ? "text-sky-400" : "text-slate-300"
              }
            >
              {option.name}
            </span>
            <span
              className={`rounded-md ${option.view === curView ? "bg-sky-500 text-white" : "bg-slate-200 text-slate-400"} px-2 py-0.5`}
            >
              {option.displayedTasks.length}
            </span>
          </button>
        ))}
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
  const dispatch = useAppDispatch();

  return (
    <li className="flex w-full items-center gap-4">
      {true ? <CheckBoxOutlineBlank /> : <CheckBox />}
      <div className="flex w-full items-center gap-2 rounded-r-xl bg-white p-4">
        {/* Icon */}
        <ProjectIcon
          name={taskObj.task.icon}
          outerClassName="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-100 text-sky-500"
          sx={{ fontSize: "18px" }}
        />
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
            {React.createElement(getProgressMsgObj[taskObj.task.status].Icon, {
              fontSize: "small",
            })}
            <span className="text-sm font-medium">
              {getProgressMsgObj[taskObj.task.status].msg}
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
          <div
            className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-100 text-sky-500"
            onClick={() => dispatch(openEditTaskModal(taskObj.task.id))}
          >
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
