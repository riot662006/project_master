import { SerializableTask } from "@/utils/types";
import { Circle } from "@mui/icons-material";

const TaskList = ({ tasks }: { tasks: SerializableTask[] }) => {
  let footer: string | null = null;

  // Surplus indicator footer if more tasks than can show
  if (tasks.length > 3) {
    // add 's' if more than one we can't show
    footer = `+${tasks.length - 3} task${tasks.length > 4 ? "s" : ""}`;
  }

  return (
    <div>
      <ul className="ml-2 flex h-28 flex-col gap-4 text-sm text-slate-400">
        {tasks.slice(0, 3).map((task) => (
          <TaskItem key={task.id} task={task} />
        ))}
      </ul>

      <span className="flex h-4 items-center text-sm text-sky-400">
        {footer}
      </span>
    </div>
  );
};

const TaskItem = ({ task }: { task: SerializableTask }) => {
  return (
    <li className="flex w-full items-center gap-2 text-sm">
      <Circle sx={{ fontSize: "8px" }} />
      <span className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
        {task.title}
      </span>
    </li>
  );
};

export default TaskList;
