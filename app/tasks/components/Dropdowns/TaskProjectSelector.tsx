import { useAppSelector } from "@/hooks/storeHooks";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { selectProjects } from "@/store/Selectors";
import { IAddTaskFormInput } from "@/utils/types";
import React, { useEffect, useRef, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

const TaskProjectSelector = (
  props: UseControllerProps<IAddTaskFormInput, "projectId">,
) => {
  const { field, fieldState } = useController(props);
  const projects = useAppSelector(selectProjects("name"));

  const projectNamesToId = projects.reduce(
    (acc, project) => {
      acc[project.title] = project.id;
      return acc;
    },
    {} as { [key: string]: string },
  );

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuActive, toggleMenu, closeMenu] = useDetectOutsideClick(
    menuRef,
    false,
  );

  const [searchValue, setSearchValue] = useState<string>("");

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSearchInputFocus = () => {
    toggleMenu();
  };
  const onSearchInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
      const projectId = projectNamesToId[e.currentTarget.value];
      if (projectId) {
        field.onChange(projectId);
      }
    }
  };

  const onProjectClicked = (value: string) => {
    field.onChange(value);
    setSearchValue(projects.find((project) => project.id == value)?.title ?? "");
    closeMenu();
  };

  const searchedProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  return (
    <div className="relative flex w-full flex-col text-sm">
      <div className="flex w-full flex-col" ref={menuRef}>
        <div className="flex w-full rounded-sm border p-2">
          <input
            className="flex flex-grow items-center gap-2 truncate text-ellipsis whitespace-nowrap outline-none"
            placeholder="Select Project..."
            onChange={onSearchInputChange}
            onFocus={onSearchInputFocus}
            value={searchValue}
            onKeyDown={onSearchInputKeydown}
          />
        </div>
        <div
          className={`absolute top-14 z-40 flex w-full flex-col ${isMenuActive ? "block" : "hidden"} rounded-md border-gray-200 bg-white px-2 py-4 shadow-md`}
        >
          {searchedProjects.length ? (
            searchedProjects.map((project) => (
              <span
                key={project.id}
                className={`cursor-default rounded-sm p-2 ${project.id == field.value ? "border border-sky-300 bg-sky-200" : "hover:bg-sky-100"}`}
                onClick={() => onProjectClicked(project.id)}
              >
                {project.title}
              </span>
            ))
          ) : (
            <span className="text-center text-xs italic text-slate-300">
              No projects found
            </span>
          )}
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
