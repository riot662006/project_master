import ProjectCardOptions from "@/app/pages/all_projects/components/DropDowns/ProjectCardOptions";
import ProjectIcon from "@/app/components/ProjectIcon";
import { Project, Task } from "@/app/utils/types";
import { LibraryAdd, MoreVert } from "@mui/icons-material";
import Circle from "@mui/icons-material/Circle";

const ProjectCard = ({ project }: { project: Project }) => {
  const { title, icon, tasks, createdAt } = project;
  const taskProgress = calculateProgressPercentage(
    tasks.length,
    tasks.filter((task) => task.status === "completed").length,
  );

  const ProjectCardHeader = () => {
    return (
      <div className="flex w-full items-center">
        {/* Title and Icon */}
        <div className="flex w-full items-center gap-4">
          {/* Icon */}
          <ProjectIcon
            name={icon}
            outerClassName="flex flex-none items-center justify-center w-10 aspect-square rounded-md bg-sky-500"
            innerClassName="flex items-center justify-center text-white"
            sx={{ fontSize: "20px" }}
          />
          {/* Title */}
          <div className="flex w-44 flex-col overflow-hidden max-sm:w-full">
            <span className="text-m w-full truncate text-ellipsis whitespace-nowrap font-bold">
              {title}
            </span>
            <span className="text-xs text-slate-400">
              {timeSinceCreatedDisplay(createdAt)} ago
            </span>
          </div>
        </div>
        {/* Options */}
        <ProjectCardOptions project={project} />
      </div>
    );
  };

  const ProjectCardBody = () => {
    return (
      <div className="flex h-32 flex-col">
        {tasks.length > 0 ? (
          <>
            <ul className="ml-2 flex h-28 flex-col gap-4 text-sm text-slate-400">
              {tasks.slice(0, 3).map((task) => (
                <ProjectCardBodyItem key={task.id} task={task} />
              ))}
            </ul>

            <span className="flex h-4 items-center text-sm text-sky-400">
              {tasks.length > 3
                ? `+${tasks.length - 3} task${tasks.length - 3 > 1 ? "s" : ""}`
                : null}
            </span>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-slate-300">
            <button onClick={() => {}}>
              <LibraryAdd
                sx={{ fontSize: "40px" }}
                className="hover:text-sky-500"
              />
            </button>
            <span className="text-sm">No tasks created yet...</span>
          </div>
        )}
      </div>
    );
  };

  const ProjectCardFooter = () => {
    return (
      <div className="flex flex-col gap-4">
        <ProjectProgressBar />
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">On Progress</span>
          <span className="font-semibold">{taskProgress}%</span>
        </div>
      </div>
    );
  };

  const ProjectProgressBar = () => {
    return (
      <div className="h-2 w-full rounded-lg bg-slate-100">
        <div
          className="h-2 rounded-lg bg-sky-500"
          style={{ width: `${taskProgress}%` }}
        />
      </div>
    );
  };

  return (
    <div className="h-84 flex w-80 flex-col gap-8 bg-white p-8 max-sm:w-full">
      <ProjectCardHeader />
      <ProjectCardBody />
      <ProjectCardFooter />
    </div>
  );
};

const ProjectCardBodyItem = ({ task }: { task: Task }) => {
  return (
    <li className="flex w-full items-center gap-2 text-sm">
      <Circle sx={{ fontSize: "8px" }} />
      <span className="w-full overflow-hidden truncate text-ellipsis whitespace-nowrap">
        {task.title}
      </span>
    </li>
  );
};

const timeSinceCreatedDisplay = (createdAt: string): string => {
  const creation = new Date(createdAt);
  const now = new Date();
  const differenceInTime = now.getTime() - creation.getTime();

  const minutesSinceCreated = differenceInTime / (1000 * 60);
  if (minutesSinceCreated < 60) {
    return `${Math.floor(minutesSinceCreated)} mins`;
  }

  const hoursSinceCreated = minutesSinceCreated / 60;

  if (hoursSinceCreated < 24) {
    return `${Math.floor(hoursSinceCreated)} hours`;
  }

  const daysSinceCreated = hoursSinceCreated / 24;
  return `${Math.floor(daysSinceCreated)} days`;
};

const calculateProgressPercentage = (
  totalTasks: number,
  completedTasks: number,
): number => {
  return totalTasks > 0 ? Math.round((completedTasks / totalTasks) * 100) : 0;
};

export default ProjectCard;
