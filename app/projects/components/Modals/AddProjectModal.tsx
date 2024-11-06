import { useAppContext } from "@/utils/AppContext";
import { BorderAll, Close } from "@mui/icons-material";
import { useLayoutEffect, useState } from "react";
import { SubmitHandler, useWatch } from "react-hook-form";
import SelectProjectIconSection from "../SelectProjectIconSection";
import ProjectIcon from "@/components/ProjectIcon";
import { IAddProjectFormInput } from "@/utils/types";
import { createProject } from "@/utils/functions";
import { allProjectIcons, IconName } from "@/utils/projectIcons";
import toast from "react-hot-toast";
import { CircularProgress } from "@mui/material";

const AddProjectModal = () => {
  const { addProjectModalObj, allProjects, projectActions } = useAppContext();
  const { isOpen, setIsOpen, mode, formData } = addProjectModalObj;

  const {
    handleSubmit,
    setError,
    setFocus,
    reset,
    formState: { errors },
  } = formData;
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const closeModal = () => setIsOpen(false);

  const onSubmit: SubmitHandler<IAddProjectFormInput> = (data) => {
    const selectedIconName: IconName =
      allProjectIcons.find((icon) => icon.id === data.icon_id)?.name ||
      "default";

    // if the project name already exists, return error
    const existingProject = allProjects.find(
      (project) => project.title.toLowerCase() == data.name.toLowerCase(),
    );

    setIsAdding(true);

    if (existingProject) {
      setError("name", {
        type: "manual",
        message: "Project already exists",
      });
      setFocus("name");
      setIsAdding(false);
      return;
    }

    const tryAdd = async () => {
      await setTimeout(() => {
        if (Math.floor(Math.random() * 2) == 0)
          setError("root", {
            type: "manual",
            message: "Something went wrong",
          });
        else {
          projectActions.append(createProject(data.name, selectedIconName));
          toast.success("Project added successfully");

          reset();
          closeModal();
        }

        setIsAdding(false);
      }, 2000);
    };

    tryAdd();
  };

  useLayoutEffect(() => {
    // will reset all inputs on open
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  const Header = () => {
    return (
      <div className="flex w-full items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-md bg-sky-100 p-2">
            <BorderAll sx={{ fontSize: "18px" }} className="text-sky-500" />
          </div>
          <span className="text-md font-bold">Add Project</span>
        </div>
        <button className="cursor-pointer text-slate-400 disabled:cursor-default disabled:text-slate-200"
          onClick={closeModal} disabled={isAdding}>
          <Close
          
        />
        </button>
        
      </div>
    );
  };

  const Footer = () => {
    return (
      <div className="flex w-full justify-end gap-4 transition-colors">
        <button
          disabled={isAdding}
          onClick={closeModal}
          className="flex h-8 cursor-pointer items-center rounded-md border p-4 text-xs text-slate-400 hover:bg-slate-50 disabled:cursor-default disabled:text-slate-300 disabled:hover:bg-none max-sm:px-2"
        >
          <span className="font-medium">Cancel</span>
        </button>
        <button
          disabled={isAdding || Boolean(errors.name)}
          type="submit"
          className="flex h-8 cursor-pointer items-center rounded-md bg-sky-500 p-4 pr-4 text-xs text-white hover:bg-sky-600 disabled:cursor-default disabled:bg-sky-400 disabled:hover:bg-sky-400 max-sm:px-2 gap-2"
        >
          {isAdding ? (
            <>
              <span>Saving...</span>
              <CircularProgress size="1rem" sx={{ color: "white" }} />
            </>
          ) : (
            <span>Add Project</span>
          )}
        </button>
      </div>
    );
  };

  return (
    <div
      className={`${isOpen ? "" : "hidden"} fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-slate-800/50`}
    >
      <div
        className={`${mode == "default" ? "" : "hidden"} flex w-[50%] max-w-2xl flex-col items-center gap-10 rounded-md bg-white p-8 max-sm:w-80`}
      >
        <Header />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <ProjectInput disabled={isAdding} />
          <Footer />
        </form>
      </div>
      <div
        className={`${mode == "select-icon" ? "" : "hidden"} flex w-[50%] max-w-2xl flex-col items-center gap-10 rounded-md bg-white p-8 max-sm:w-80`}
      >
        <SelectProjectIconSection />
      </div>
    </div>
  );
};

const ProjectInput = ({ disabled }: { disabled: boolean }) => {
  const { addProjectModalObj } = useAppContext();
  const { setMode, formData } = addProjectModalObj;
  const {
    register,
    formState: { errors },
  } = formData;

  const icon_id = useWatch({ control: formData.control, name: "icon_id" });
  const openIconSelect = () => setMode("select-icon");

  const preventSubmitOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    if (e.key === "Enter") e.preventDefault();
  };

  return (
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
              onKeyDown={preventSubmitOnEnter}
              disabled={disabled}
            />
          </div>
          <button type="button" onClick={openIconSelect} disabled={disabled} className="rounded-md bg-sky-500 p-2 transition-colors hover:bg-sky-600 disabled:bg-sky-400 disabled:hover:bg-sky-400">
            <ProjectIcon
              id={icon_id}
              innerClassName="text-white"
            />
          </button>
        </div>
        <p className="text-sm font-medium text-red-500">
          {errors.name?.message || errors.root?.message}
        </p>
      </div>
    </div>
  );
};

export default AddProjectModal;
