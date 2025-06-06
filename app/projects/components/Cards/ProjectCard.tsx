import ProjectCardOptions from "@/app/projects/components/DropDowns/ProjectCardOptions";
import ProgressBar from "@/components/ProgressBar";
import ProjectIcon from "@/components/ProjectIcon";
import { SerializableProject } from "@/utils/types";
import { LibraryAdd } from "@mui/icons-material";
import TaskList from "../Lists/TaskList";
import {
  calculateProgressPercentage,
  timeSinceCreatedDisplay,
} from "@/utils/functions";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { setSelectedProject } from "@/store/slices/tasksUISlice";
import { useRouter } from "next/navigation";
import { openAddTaskModal } from "@/store/slices/addTaskModalSlice";
import { validateIcon } from "@/utils/projectIcons";

const ProjectCard = ({ project }: { project: SerializableProject }) => {
  const { title, icon, tasks, createdAt } = project;
  const taskProgress = calculateProgressPercentage(
    tasks.length,
    tasks.filter((task) => task.status === "completed").length,
  );

  const dispatch = useAppDispatch();
  const router = useRouter();

  const redirectToTasksPage = (selectedProject: string) => {
    dispatch(setSelectedProject(selectedProject));
    router.push("/tasks");
  };

  const onProjectItemPlaceholderClicked = (selectedProject: string) => {
    dispatch(setSelectedProject(selectedProject));
    dispatch(openAddTaskModal());
  };

  const ProjectCardHeader = () => {
    return (
      <div className="flex w-full items-center">
        {/* Title and Icon */}
        <div className="flex w-full items-center gap-4">
          {/* Icon */}
          <ProjectIcon
            name={validateIcon(icon)}
            outerClassName="flex flex-none items-center justify-center w-10 aspect-square rounded-md bg-sky-500"
            innerClassName="flex items-center justify-center text-white"
            sx={{ fontSize: "20px" }}
          />
          {/* Title */}
          <div className="flex w-44 flex-col overflow-hidden max-sm:w-full">
            <button
              className="text-m flex w-full cursor-pointer truncate text-ellipsis whitespace-nowrap font-bold hover:text-sky-400"
              onClick={() => {
                redirectToTasksPage(project.id);
              }}
            >
              {title}
            </button>
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
          <TaskList tasks={tasks} />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-4 text-slate-300">
            <button
              onClick={() => {
                onProjectItemPlaceholderClicked(project.id);
              }}
            >
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
        <ProgressBar percentage={taskProgress} />
        <div className="flex items-center justify-between text-xs">
          <span className="text-slate-400">On Progress</span>
          <span className="font-semibold">{taskProgress}%</span>
        </div>
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

export default ProjectCard;
