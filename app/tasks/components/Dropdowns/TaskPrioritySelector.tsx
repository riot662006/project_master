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
  { value: "low", label: "Low", color: "bg-green-600"},
  { value: "medium", label: "Medium", color: "bg-yellow-600" },
  { value: "high", label: "High", color: "bg-red-600" },
];

const TaskPrioritySelector = (
  props: UseControllerProps<IAddTaskFormInput, "priority">,
) => {
  const { field, fieldState } = useController(props);

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuActive, toggleMenu, closeMenu] = useDetectOutsideClick(
    menuRef,
    false,
  );

  const onOptionClicked = (value: Priority) => {
    closeMenu();
    field.onChange(value);
  }

  const curOption = priorities.find((option) => option.value == field.value);

  return (
    <div className="flex w-full flex-col relative text-sm">
      <div className="flex w-full flex-col" ref={menuRef}>
        <div className="flex w-full border rounded-sm p-2" onClick={() => toggleMenu()}>
          <span className={`flex flex-grow gap-2 items-center text-ellipsis truncate whitespace-nowrap ${!curOption && "text-slate-400"}`}>
            {curOption && <span className={`w-2 aspect-square ${curOption?.color} rounded-full`}/>}
            {curOption?.label ?? "Select Priority..."}
          </span>
          <KeyboardArrowDown/>
        </div>
        <div className={`absolute top-14 z-40 flex flex-col w-full ${isMenuActive ? "block" : "hidden"} rounded-md border-gray-200 bg-white px-2 py-4 shadow-md`}>
          {priorities.map((option) => (
            <span
              key={option.value}
              className={`p-2 cursor-default rounded-sm ${option.value == field.value ? "bg-sky-200 border border-sky-300" : "hover:bg-sky-100"}`}
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
