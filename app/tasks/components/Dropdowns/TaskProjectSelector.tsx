import { useAppSelector } from "@/hooks/storeHooks";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { selectProjects } from "@/store/Selectors";
import { IAddTaskFormInput } from "@/utils/types";
import { KeyboardArrowDown } from "@mui/icons-material";
import React, { useRef } from "react";
import { useController, UseControllerProps } from "react-hook-form";

const TaskProjectSelector = (
  props: UseControllerProps<IAddTaskFormInput, "projectId">,
) => {
  const { field, fieldState } = useController(props);
  const projects = useAppSelector(selectProjects("name"));

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuActive, toggleMenu, closeMenu] = useDetectOutsideClick(
    menuRef,
    false,
  );

  const onProjectClicked = (value: string) => {
    closeMenu();
    field.onChange(value);
  };

  const curProject = projects.find((project) => project.id == field.value);

  return (
    <div className="relative flex w-full flex-col text-sm">
      <div className="flex w-full flex-col" ref={menuRef}>
        <div
          className="flex w-full rounded-sm border p-2"
          onClick={() => toggleMenu()}
        >
          <span className="flex flex-grow items-center gap-2 truncate text-ellipsis whitespace-nowrap">
            {curProject?.title ?? "Select Project..."}
          </span>
          <KeyboardArrowDown />
        </div>
        <div
          className={`absolute top-14 z-40 flex w-full flex-col ${isMenuActive ? "block" : "hidden"} rounded-md border-gray-200 bg-white px-2 py-4 shadow-md`}
        >
          {projects.map((project) => (
            <span
              key={project.id}
              className={`cursor-default rounded-sm p-2 ${project.id == field.value ? "border border-sky-300 bg-sky-200" : "hover:bg-sky-100"}`}
              onClick={() => onProjectClicked(project.id)}
            >
              {project.title}
            </span>
          ))}
        </div>
      </div>
      {fieldState.error && (
        <span className="text-sm font-medium text-red-500">
          {fieldState.error.message}
        </span>
      )}
    </div>
  );
};

export default TaskProjectSelector;
