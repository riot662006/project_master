import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { IAddTaskFormInput, Priority } from "@/utils/types";
import { KeyboardArrowDown } from "@mui/icons-material";
import React, { useRef } from "react";
import { useController, UseControllerProps } from "react-hook-form";

interface TaskPriorityOption {
  value: Priority;
  label: string;
  color: string;
}

const priorities: TaskPriorityOption[] = [
  { value: "low", label: "Low", color: "bg-green-600" },
  { value: "medium", label: "Medium", color: "bg-yellow-600" },
  { value: "high", label: "High", color: "bg-red-600" },
];

const TaskPrioritySelector = (
  props: UseControllerProps<IAddTaskFormInput, "priority">,
) => {
  const { field, fieldState } = useController(props);

  const menuRef = useRef<HTMLDivElement>(null);
  const {
    isActive: isMenuActive,
    toggleMenu,
    closeMenu,
  } = useDetectOutsideClick(menuRef, false);

  const onOptionClicked = (value: Priority) => {
    closeMenu();
    field.onChange(value);
  };

  const curOption = priorities.find((option) => option.value == field.value);

  return (
    <div className="relative flex w-full flex-col text-sm">
      <div className="flex w-full flex-col" ref={menuRef}>
        <div
          className="flex w-full rounded-sm border p-2"
          onClick={() => toggleMenu()}
        >
          <span
            className={`flex flex-grow items-center gap-2 truncate text-ellipsis whitespace-nowrap ${!curOption && "text-slate-400"}`}
          >
            {curOption && (
              <span
                className={`aspect-square w-2 ${curOption?.color} rounded-full`}
              />
            )}
            {curOption?.label ?? "Select Priority..."}
          </span>
          <KeyboardArrowDown />
        </div>
        <div
          className={`absolute top-14 z-40 flex w-full flex-col ${isMenuActive ? "block" : "hidden"} rounded-md border-gray-200 bg-white px-2 py-4 shadow-md`}
        >
          {priorities.map((option) => (
            <span
              key={option.value}
              className={`cursor-default rounded-sm p-2 ${option.value == field.value ? "border border-sky-300 bg-sky-200" : "hover:bg-sky-100"}`}
              onClick={() => onOptionClicked(option.value)}
            >
              {option.label}
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

export default TaskPrioritySelector;
