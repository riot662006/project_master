"use client";

import ProgressBar from "@/components/ProgressBar";
import {
  useAppDispatch,
  useAppSelector,
  useTasks,
} from "@/hooks/useStoreHooks";
import { toggleSidebar } from "@/store/slices/sidebarSlice";
import { Add, Menu, Search, Splitscreen } from "@mui/icons-material";
import ProjectSelector from "../Dropdowns/ProjectSelector";
import TaskSortingOptions from "../Dropdowns/TaskSortingOptions";
import { openAddTaskModal } from "@/store/slices/addTaskModalSlice";

const TaskHeader = () => {
  const dispatch = useAppDispatch();

  const selectedProjectId = useAppSelector(
    (state) => state.tasksPage.selectedProjectId,
  );

  const { tasks } = useTasks();
  const completedTasks = tasks.filter((task) => task.status === "completed");

  const percentageCompleted = Math.round(
    (completedTasks.length / (tasks.length || 1)) * 100,
  );

  const SearchBar = () => {
    return (
      <div className="flex items-center">
        <div className="flex h-10 w-10 items-center justify-center border-b-2 border-sky-500 outline-none">
          <Search className="text-slate-400" />
        </div>
        <div className="w-[67%] border-b-2 border-slate-200">
          <input
            placeholder="Search a task..."
            className="bg-transparent p-2 text-[14px] outline-none"
          />
        </div>
      </div>
    );
  };

  const NewTaskButton = () => {
    return (
      <div
        className="flex h-8 cursor-pointer items-center rounded-md bg-sky-500 pl-2 pr-4 text-[14px] text-white max-sm:px-2"
        onClick={() =>
          selectedProjectId.length
            ? dispatch(openAddTaskModal())
            : dispatch(openAddTaskModal())
        }
      >
        <Add sx={{ fontSize: "22px" }} />
        <span className="font-medium max-sm:hidden">New Task</span>
      </div>
    );
  };

  return (
    <div className="flex flex-col">
      <div className="flex items-center justify-between">
        <SearchBar />
        <div className="flex items-center gap-2">
          <NewTaskButton />
          <button onClick={() => dispatch(toggleSidebar(true))}>
            <Menu className="hidden cursor-pointer text-slate-400 max-sm:block" />
          </button>
        </div>
      </div>
      <div className="flex items-center justify-between py-8">
        <div className="flex items-center gap-4">
          <div className="flex aspect-square w-8 items-center justify-center rounded-md bg-sky-100">
            <Splitscreen sx={{ fontSize: "18px" }} className="text-sky-500" />
          </div>
          <div className="flex flex-col gap-1">
            <ProjectSelector />

            <div className="flex items-center gap-2 text-xs text-slate-400">
              <ProgressBar
                containerClassName="w-96 h-1 rounded-lg bg-slate-200 max-lg:w-[100%]"
                percentage={percentageCompleted}
              />
              <span className="max-sm:hidden">
                {percentageCompleted}% Completed
              </span>
            </div>
          </div>
        </div>
        <div className="flex items-center justify-end gap-2 text-[14px] max-sm:flex-col max-sm:items-end">
          <span className="flex items-center font-semibold text-slate-300">
            Sort By
          </span>
          <TaskSortingOptions />
        </div>
      </div>
    </div>
  );
};

export default TaskHeader;
