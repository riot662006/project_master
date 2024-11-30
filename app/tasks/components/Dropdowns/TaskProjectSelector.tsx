import { useProjects } from "@/hooks/useStoreHooks";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { IAddTaskFormInput } from "@/utils/types";
import { KeyboardArrowDown } from "@mui/icons-material";
import React, { useRef, useState } from "react";
import { useController, UseControllerProps } from "react-hook-form";

const TaskProjectSelector = (
  props: UseControllerProps<IAddTaskFormInput, "projectId">,
) => {
  const isDisabled = props.disabled;

  const { field, fieldState } = useController(props);
  const { projects, isFetching } = useProjects();

  const menuRef = useRef<HTMLDivElement>(null);

  const [searchValue, setSearchValue] = useState<string>("");

  const {
    isActive: isMenuActive,
    toggleMenu,
    closeMenu,
  } = useDetectOutsideClick(menuRef, false, () => {
    setSearchValue("");
  });

  const onSearchInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  const onSearchInputKeydown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key == "Enter") {
      e.preventDefault();
    }
  };
  const onProjectClicked = (value: string) => {
    field.onChange(value);
    closeMenu();
  };

  const searchedProjects = projects.filter((project) =>
    project.title.toLowerCase().includes(searchValue.toLowerCase()),
  );

  const curSelectedProject = projects.find(
    (project) => project.id === field.value,
  );

  return (
    <div className="relative flex w-full flex-col text-sm">
      <div
        className={`flex w-full flex-col ${isDisabled && "bg-slate-100"}`}
        ref={menuRef}
      >
        <div className="flex w-full rounded-sm border p-2">
          <span
            className={`flex flex-grow items-center gap-2 truncate text-ellipsis whitespace-nowrap ${!curSelectedProject && "text-slate-400"}`}
            onClick={() => {
              (!isDisabled) ? toggleMenu() : null;
            }}
          >
            {curSelectedProject?.title ?? "Select Project..."}
          </span>
          <KeyboardArrowDown />
        </div>
        <div
          className={`absolute top-14 z-30 flex w-full flex-col ${isMenuActive && !isDisabled ? "block" : "hidden"} gap-2 rounded-md border-gray-200 bg-white px-2 py-4 shadow-md`}
        >
          <div className="flex w-full">
            <input
              placeholder="Search..."
              value={searchValue}
              onChange={onSearchInputChange}
              onKeyDown={onSearchInputKeydown}
              className="w-full rounded-sm p-2 outline outline-2 outline-slate-200 focus:outline-sky-400"
              disabled={isDisabled}
            />
          </div>
          <div className="flex max-h-36 flex-col overflow-y-auto">
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
                {isFetching ? "Loading" : "No projects found"}
              </span>
            )}
          </div>
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
