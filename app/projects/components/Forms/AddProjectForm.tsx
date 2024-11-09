import ProjectIcon from "@/components/ProjectIcon";
import { CircularProgress } from "@mui/material";
import SelectProjectIconSection from "../Sections/SelectProjectIconSection";
import { createProject } from "@/utils/functions";
import { addProject } from "@/store/slices/projectsSlice";
import { SubmitHandler, useForm, useWatch } from "react-hook-form";
import { IAddProjectFormInput } from "@/utils/types";
import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { closeModal } from "@/store/slices/addProjectModalSlice";
import { allProjectIcons, IconName } from "@/utils/projectIcons";

const AddProjectForm = ({
  isSelectingIcon,
  setIsSelectingIcon,
}: {
  isSelectingIcon: boolean;
  setIsSelectingIcon: React.Dispatch<boolean>;
}) => {
  const dispatch = useAppDispatch();
  const allProjects = useAppSelector((state) => state.projects.projectsList);
  const isDisabled = useAppSelector(
    (state) => state.addProjectModal.isDisabled,
  );

  const {
    register,
    handleSubmit,
    setError,
    setFocus,
    setValue,
    reset,
    control,
    formState: { errors },
  } = useForm<IAddProjectFormInput>({
    defaultValues: {
      icon_id: 1,
    },
  });
  const icon_id = useWatch({ control, name: "icon_id" });

  const closeModalHandler = () => dispatch(closeModal());

  const onSubmit: SubmitHandler<IAddProjectFormInput> = async (data) => {
    const selectedIconName: IconName =
      allProjectIcons.find((icon) => icon.id === data.icon_id)?.name ||
      "default";

    const existingProject = allProjects.find(
      (project) => project.title.toLowerCase() === data.name.toLowerCase(),
    );

    if (existingProject) {
      setError("name", {
        type: "manual",
        message: "Project already exists",
      });
      setFocus("name");
      return;
    }

    const newProject = createProject(data.name, selectedIconName);

    try {
      await dispatch(addProject(newProject)).unwrap();
      reset();
    } catch {
      setError("root", { type: "manual", message: "Something went wrong" });
    }
  };

  return isSelectingIcon ? (
    <SelectProjectIconSection
      curIconId={icon_id}
      onIconSelect={(id) => {
        setValue("icon_id", id);
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
              <ProjectIcon id={icon_id} innerClassName="text-white" />
            </button>
          </div>
          <p className="text-sm font-medium text-red-500">
            {errors.name?.message || errors.root?.message}
          </p>
        </div>
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
          className="flex h-8 cursor-pointer items-center rounded-md bg-sky-500 p-4 pr-4 text-xs text-white hover:bg-sky-600 disabled:cursor-default disabled:bg-sky-400"
        >
          {isDisabled ? (
            <>
              <span>Saving...</span>
              <CircularProgress size="1rem" sx={{ color: "white" }} />
            </>
          ) : (
            <span>Add Project</span>
          )}
        </button>
      </div>
    </form>
  );
};

export default AddProjectForm;
