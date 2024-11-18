import React from "react";
import colors from "tailwindcss/colors";

interface TaskPriorityOption {
  value: string;
  label: string;
  color: string;
}

const priorities: TaskPriorityOption[] = [
  { value: "low", label: "Low", color: colors.green[600] },
  { value: "medium", label: "Medium", color: colors.yellow[600] },
  { value: "high", label: "High", color: colors.red[600] },
];

const TaskPrioritySelector = () => {
  return <></>;
};

export default TaskPrioritySelector;
