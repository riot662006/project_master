"use client";

import ProjectIcon from "@/components/ProjectIcon";
import { CircularProgress } from "@mui/material";
import SelectProjectIconSection from "@/components/Sections/SelectProjectIconSection";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { IAddTaskFormInput } from "@/utils/types";
import {
  useAppDispatch,
  useAppSelector,
  useTasks,
} from "@/hooks/useStoreHooks";
import { closeModal } from "@/store/slices/addTaskModalSlice";
import {
  useAddTaskMutation,
  useUpdateTaskMutation,
} from "@/store/slices/apiSlice";
import toast from "react-hot-toast";

import { useEffect } from "react";
import TaskPrioritySelector from "../Dropdowns/TaskPrioritySelector";
import TaskProjectSelector from "../Dropdowns/TaskProjectSelector";
import { IconName, validateIcon } from "@/utils/projectIcons";

const AddTaskForm = ({
  isSelectingIcon,
  setIsSelectingIcon,
}: {
  isSelectingIcon: boolean;
  setIsSelectingIcon: React.Dispatch<boolean>;
}) => {
  const dispatch = useAppDispatch();

  const { mode, taskId } = useAppSelector((state) => state.addTaskModal);

  const { tasks, isFetching } = useTasks();
  const [addTask, { isLoading: isAdding }] = useAddTaskMutation();
  const [updateTask, { isLoading: isUpdating }] = useUpdateTaskMutation();

  const isDisabled = isFetching || isAdding || isUpdating;

  const taskToEdit = tasks.find((task) => task.id === taskId);

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<IAddTaskFormInput>({
    defaultValues: {
      name: "",
      icon: "default",
      projectId: "",
      priority: "medium",
    },
  });

  useEffect(() => {
    if (mode === "edit" && taskToEdit) {
      reset({
        name: taskToEdit.title,
        icon: validateIcon(taskToEdit.icon),
        projectId: taskToEdit.projectId,
        priority: taskToEdit.priority,
      });
    } else {
      reset({
        name: "",
        icon: "default",
        projectId: "",
        priority: "medium",
      });
    }
  }, [taskToEdit, reset, mode]);

  const icon = useWatch({ control, name: "icon" });

  const closeModalHandler = () => dispatch(closeModal());

  const onSubmit: SubmitHandler<IAddTaskFormInput> = async (data) => {
    const selectedIconName: IconName = validateIcon(data.icon) || "default";

    const taskInfo = {
      title: data.name.trim(),
      icon: selectedIconName,
      priority: data.priority,
      projectId: data.projectId,
    };

    try {
      if (mode === "add") {
        await addTask(taskInfo).unwrap();
        toast.success("Task added successfully!");
      } else {
        if (!taskToEdit) throw new Error("No task to edit.");

        await updateTask({
          taskId: taskToEdit.id,
          projectId: taskToEdit.projectId,
          updatedFields: taskInfo,
        }).unwrap();
        toast.success("Task updated successfully!");
      }

      reset();
      closeModalHandler();
    } catch {
      toast.error(`Failed to ${mode} the task.`);
      setError("root", { type: "manual", message: "Something went wrong" });
    }
  };

  const isNameDuplicate = (name: string) =>
    tasks
      ?.filter((task) => task.id !== taskToEdit?.id)
      .some((task) => task.title.toLowerCase() === name.toLowerCase());

  return isSelectingIcon ? (
    <SelectProjectIconSection
      curIcon={icon}
      onIconSelect={(icon) => {
        setValue("icon", icon);
        setIsSelectingIcon(false);
      }}
    />
  ) : (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex w-full flex-col gap-10"
    >
      <div className="flex w-full flex-col gap-2">
        <p className="text-sm font-semibold">Task Name</p>
        <div className="ml-2 flex flex-col gap-2">
          <div className="flex w-full items-center gap-4">
            <div className="flex-grow rounded-md border border-slate-200 p-2">
              <input
                {...register("name", {
                  required: "Task name is required",
                  maxLength: {
                    value: 50,
                    message: "Task name must be 50 characters or less",
                  },
                  validate: {
                    notOnlySpaces: (value) =>
                      value.trim() !== "" || "Task name cannot be only spaces",
                    uniqueName: (value) =>
                      !isNameDuplicate(value) || "Task name already exists",
                  },
                })}
                placeholder="Enter Task Name..."
                className="w-full bg-transparent text-sm outline-none"
                onKeyDown={(e) => e.key === "Enter" && e.preventDefault()}
                disabled={isDisabled}
              />
            </div>
            <button
              type="button"
              onClick={() => setIsSelectingIcon(true)}
              disabled={isDisabled}
              className="rounded-md bg-sky-500 p-2 transition-colors hover:bg-sky-600 disabled:bg-sky-400"
            >
              <ProjectIcon name={icon} innerClassName="text-white" />
            </button>
          </div>
          <p className="text-sm font-medium text-red-500">
            {errors.name?.message || errors.root?.message}
          </p>
        </div>
      </div>
      <div className="flex w-full gap-4 max-md:flex-col">
        <div className="flex w-full flex-col gap-2">
          <p className="text-sm font-semibold">Task Priority</p>
          <TaskPrioritySelector
            control={control}
            name="priority"
            rules={{ required: "Priority is required" }}
            disabled={isDisabled}
          />
        </div>
        <div className="flex w-full flex-col gap-2">
          <p className="text-sm font-semibold">Project</p>
          <TaskProjectSelector
            control={control}
            name="projectId"
            rules={{ required: "Project is required" }}
            disabled={isDisabled}
          />
        </div>
      </div>
      <div className="flex w-full justify-end gap-4 transition-colors">
        <button
          type="button"
          disabled={isDisabled}
          onClick={closeModalHandler}
          className="flex h-8 cursor-pointer items-center rounded-md border p-4 text-xs text-slate-400 hover:bg-slate-50 disabled:cursor-default disabled:text-slate-300"
        >
          <span className="font-medium">Cancel</span>
        </button>
        <button
          disabled={isDisabled || Boolean(errors.name)}
          type="submit"
          className="flex h-8 cursor-pointer items-center gap-2 rounded-md bg-sky-500 p-4 pr-4 text-xs text-white hover:bg-sky-600 disabled:cursor-default disabled:bg-sky-400"
        >
          {isDisabled ? (
            <>
              <span>Saving...</span>
              <CircularProgress size="1rem" sx={{ color: "white" }} />
            </>
          ) : (
            <span>{mode === "edit" ? "Edit" : "Add"} Task</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddTaskForm;
