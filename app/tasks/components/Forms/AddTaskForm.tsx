import ProjectIcon from "@/components/ProjectIcon";
import { CircularProgress } from "@mui/material";
import SelectProjectIconSection from "../../../../components/Sections/SelectProjectIconSection";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { IAddTaskFormInput } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { closeModal } from "@/store/slices/addProjectModalSlice";
import { useEffect } from "react";
import { selectTasks, selectProjects } from "@/store/Selectors";
import TaskPrioritySelector from "../Dropdowns/TaskPrioritySelector";
import TaskProjectSelector from "../Dropdowns/TaskProjectSelector";
import { allProjectIcons, IconName } from "@/utils/projectIcons";
import { createTask, updatedTask } from "@/utils/functions";
import { addTask, updateTask } from "@/store/slices/projectsSlice";

const AddTaskForm = ({
  isSelectingIcon,
  setIsSelectingIcon,
}: {
  isSelectingIcon: boolean;
  setIsSelectingIcon: React.Dispatch<boolean>;
  taskId?: string;
}) => {
  const dispatch = useAppDispatch();

  const allTasks = useAppSelector(selectTasks());

  const { taskId: taskIdToEdit, mode } = useAppSelector(
    (state) => state.addTaskModal,
  );
  const taskToEdit = allTasks.find(
    (taskObj) => taskObj.task.id === taskIdToEdit,
  );

  const defaultProjectId =
    mode === "edit"
      ? (useAppSelector(selectProjects("name")).find(
          (project) => project.title === taskToEdit?.projectName,
        )?.id ?? "")
      : (useAppSelector((state) => state.tasksPage.selectedProjectId) ?? "");

  const isDisabled = useAppSelector((state) => state.addTaskModal.isDisabled);

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    reset,
    control,
    formState: { errors },
  } = useForm<IAddTaskFormInput>({
    defaultValues: {
      icon: taskToEdit?.task.icon ?? "default",
      name: taskToEdit?.task.title ?? "",
      projectId: defaultProjectId,
      priority: taskToEdit?.task.priority ?? undefined,
    },
  });

  useEffect(() => {
    reset({
      icon: taskToEdit?.task.icon ?? "default",
      name: taskToEdit?.task.title ?? "",
      projectId: defaultProjectId,
      priority: taskToEdit?.task.priority ?? undefined,
    });
  }, [defaultProjectId, reset]);

  const icon = useWatch({ control, name: "icon" });

  const closeModalHandler = () => dispatch(closeModal());

  const onSubmit: SubmitHandler<IAddTaskFormInput> = async (data) => {
    const selectedIconName: IconName =
      allProjectIcons.find((icon) => icon.name === data.icon)?.name ||
      "default";

    const taskInfo = taskToEdit
      ? updatedTask(
          taskToEdit.task,
          data.name.trim(),
          selectedIconName,
          data.priority,
        )
      : createTask(data.name.trim(), selectedIconName, data.priority);

    try {
      if (mode == "add") {
        await dispatch(
          addTask({ task: taskInfo, projectId: data.projectId }),
        ).unwrap();
      } else {
        await dispatch(
          updateTask({ task: taskInfo, projectId: data.projectId }),
        ).unwrap();
      }

      reset();
    } catch {
      setError("root", { type: "manual", message: "Something went wrong" });
    }

    console.log(data);
  };

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
      <div className="flex w-full flex-col gap-4">
        <div className="flex w-full flex-col gap-2">
          <p className="text-sm font-semibold">Task Name</p>
          <div className="flex flex-col gap-2">
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
                        value.trim() !== "" ||
                        "Task name cannot be only spaces",
                      uniqueName: (value) =>
                        !allTasks
                          .map((taskObj) => taskObj.task.title)
                          .filter((name) => name !== taskToEdit?.task.title)
                          .includes(value.trim()) || "Task name already exists",
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
            {errors.name && (
              <span className="text-sm font-medium text-red-500">
                {errors.name.message}
              </span>
            )}
          </div>
        </div>
        <div className="flex w-full gap-4 max-md:flex-col">
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm font-semibold">Task Priority</p>
            <TaskPrioritySelector
              control={control}
              name="priority"
              rules={{ required: "Priority is required" }}
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <p className="text-sm font-semibold">Project</p>
            <TaskProjectSelector
              control={control}
              name="projectId"
              rules={{ required: "Project is required" }}
            />
          </div>
        </div>
        {errors.root && (
          <div className="flex w-full justify-end text-sm font-medium text-red-500">
            {errors.root.message}
          </div>
        )}
      </div>
      <div className="flex w-full justify-end gap-4 transition-colors">
        <button
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
