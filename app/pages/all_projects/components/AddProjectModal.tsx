import { useAppContext } from "@/app/utils/AppContext";
import { BorderAll, Close } from "@mui/icons-material";
import { useLayoutEffect } from "react";
import { SubmitHandler } from "react-hook-form";
import SelectProjectIconSection from "./SelectProjectIconSection";
import ProjectIcon from "@/app/components/ProjectIcon";
import { IAddProjectFormInput } from "@/app/utils/types";
import { createProject } from "@/app/utils/functions";
import { allProjectIcons } from "@/app/utils/projectIcons";

const AddProjectModal = () => {
  const { addProjectModalObj, projectActions } = useAppContext();
  const { isOpen, setIsOpen, mode } = addProjectModalObj;

  const closeModal = () => setIsOpen(false);

  const { handleSubmit, reset } = addProjectModalObj.formData;

  const onSubmit: SubmitHandler<IAddProjectFormInput> = (data) => {
    const selectedIconData = allProjectIcons.find(
      (icon) => icon.id == data.icon_id,
    );

    if (selectedIconData) {
      projectActions.append(createProject(data.name, selectedIconData.name));
    }

    reset();
    closeModal();

    console.log(data);
  };

  useLayoutEffect(() => {
    // will reset all inputs on open
    if (isOpen) {
      reset();
    }
  }, [isOpen, reset]);

  return (
    <div
      className={`${!isOpen && "hidden"} fixed left-0 top-0 z-40 flex h-screen w-screen items-center justify-center bg-slate-800/50`}
    >
      <div
        className={`${mode != "default" && "hidden"} flex w-[50%] max-w-2xl flex-col items-center gap-10 rounded-md bg-white p-8 max-sm:w-80`}
      >
        <Header />
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="flex w-full flex-col gap-10"
        >
          <ProjectInput />
          <Footer />
        </form>
      </div>
      <div
        className={`${mode != "select-icon" && "hidden"} flex w-[50%] max-w-2xl flex-col items-center gap-10 rounded-md bg-white p-8 max-sm:w-80`}
      >
        <SelectProjectIconSection />
      </div>
    </div>
  );
};

const Header = () => {
  const { addProjectModalObj } = useAppContext();
  const { setIsOpen } = addProjectModalObj;

  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex w-full items-center justify-between">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-md bg-orange-100 p-2">
          <BorderAll sx={{ fontSize: "18px" }} className="text-orange-500" />
        </div>
        <span className="text-md font-bold">Add Project</span>
      </div>
      <Close className="cursor-pointer text-slate-400" onClick={closeModal} />
    </div>
  );
};

const ProjectInput = () => {
  const { addProjectModalObj } = useAppContext();
  const { setMode, formData } = addProjectModalObj;

  const {
    register,
    formState: { errors },
    watch,
  } = formData;

  const icon_id = watch("icon_id");

  const openIconSelect = () => setMode("select-icon");

  const preventSubmitOnEnter = (
    e: React.KeyboardEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    e.key === "Enter" && e.preventDefault();
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
            />
          </div>
          <button type="button" onClick={openIconSelect}>
            <ProjectIcon
              id={icon_id}
              outerClassName="rounded-md bg-orange-500 p-2 transition-colors hover:bg-orange-600"
              innerClassName="text-white"
            />
          </button>
        </div>
        <p className="text-sm font-medium text-red-500">
          {errors.name?.message}
        </p>
      </div>
    </div>
  );
};

const Footer = () => {
  const { addProjectModalObj } = useAppContext();
  const { setIsOpen } = addProjectModalObj;

  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex w-full justify-end gap-4 transition-colors">
      <button
        onClick={closeModal}
        className="flex h-8 cursor-pointer items-center rounded-md border p-4 text-xs text-slate-400 hover:bg-slate-50 max-sm:px-2"
      >
        <span className="font-medium">Cancel</span>
      </button>
      <button
        type="submit"
        className="flex h-8 cursor-pointer items-center rounded-md bg-orange-500 p-4 pr-4 text-xs text-white hover:bg-orange-600 max-sm:px-2"
      >
        <span className="font-medium">Add Project</span>
      </button>
    </div>
  );
};

export default AddProjectModal;
