import ProjectIcon from "@/components/ProjectIcon";
import { CircularProgress } from "@mui/material";
import SelectProjectIconSection from "../../../../components/Sections/SelectProjectIconSection";

import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { IAddProjectFormInput } from "@/utils/types";
import {
  useAppDispatch,
  useAppSelector,
  useProjects,
} from "@/hooks/useStoreHooks";
import { closeModal } from "@/store/slices/addProjectModalSlice";
import { allProjectIcons, IconName, validateIcon } from "@/utils/projectIcons";
import { useEffect } from "react";
import {
  useAddProjectMutation,
  useUpdateProjectMutation,
} from "@/store/slices/apiSlice";
import toast from "react-hot-toast";

const AddProjectForm = ({
  isSelectingIcon,
  setIsSelectingIcon,
}: {
  isSelectingIcon: boolean;
  setIsSelectingIcon: React.Dispatch<boolean>;
  projectId?: string;
}) => {
  const dispatch = useAppDispatch();

  const { mode, projectId } = useAppSelector((state) => state.addProjectModal);

  const { projects, isFetching } = useProjects();
  const [addProject, { isLoading: isAdding }] = useAddProjectMutation();
  const [updateProject, { isLoading: isUpdating }] = useUpdateProjectMutation();

  const isDisabled = isFetching || isAdding || isUpdating;

  const {
    register,
    handleSubmit,
    setError,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<IAddProjectFormInput>({
    defaultValues: {
      name: "",
      icon: "default",
    },
  });

  const projectToEdit = projects?.find((project) => project.id === projectId);

  useEffect(() => {
    if (mode === "edit" && projectToEdit) {
      reset({
        name: projectToEdit.title,
        icon: validateIcon(projectToEdit.icon),
      });
    } else {
      reset({
        icon: "default",
        name: "",
      });
    }
  }, [projectToEdit, reset, mode]);

  const icon = useWatch({ control, name: "icon" });

  const closeModalHandler = () => dispatch(closeModal());

  const onSubmit: SubmitHandler<IAddProjectFormInput> = async (data) => {
    const selectedIconName: IconName =
      allProjectIcons.find((icon) => icon.name === data.icon)?.name ||
      "default";

    const projectInfo = { title: data.name.trim(), icon: selectedIconName };

    try {
      if (mode == "add") {
        await addProject(projectInfo).unwrap();
        toast.success("Project added successfully!");
      } else {
        if (!projectToEdit)
          throw new Error("Is editing, must have a projectToEdit");

        await updateProject({
          projectId: projectToEdit.id,
          ...projectInfo,
        }).unwrap();
        toast.success("Project edited successfully!");
      }

      reset();
      closeModalHandler();
    } catch {
      toast.error(`Failed to ${mode} the project.`);
      setError("root", { type: "manual", message: "Something went wrong" });
    }
  };

  const isNameDuplicate = (name: string) =>
    projects
      ?.filter((project) => project.id !== projectToEdit?.id)
      .some((project) => project.title.toLowerCase() === name.toLowerCase());

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
        <p className="text-sm font-semibold">Project Name</p>
        <div className="ml-2 flex flex-col gap-2">
          <div className="flex w-full items-center gap-4">
            <div className="flex-grow rounded-md border border-slate-200 p-2">
              <input
                {...register("name", {
                  required: "Project name is required",
                  maxLength: {
                    value: 30,
                    message: "Project name must be 30 characters or less",
                  },
                  validate: {
                    notOnlySpaces: (value) =>
                      value.trim() !== "" ||
                      "Project name cannot be only spaces",
                    uniqueName: (value) =>
                      !isNameDuplicate(value) || "Project name already exists",
                  },
                })}
                placeholder="Enter Project Name..."
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
            <span>{mode === "edit" ? "Edit" : "Add"} Project</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;
