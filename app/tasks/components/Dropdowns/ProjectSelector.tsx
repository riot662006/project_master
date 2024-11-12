import { useAppSelector } from "@/hooks/storeHooks";
import { getTaskPageSelectedProject } from "@/store/slices/tasksPageSlice";
import { KeyboardArrowDown } from "@mui/icons-material";

const ProjectSelector = () => {
  const selectedProject = useAppSelector(getTaskPageSelectedProject);

  const projects = useAppSelector((state) => state.projects.projectsList);
  const totalTasks =
    selectedProject?.tasks.length ||
    projects.reduce((acc: number, project) => acc + project.tasks.length, 0);

  return (
    <div>
      <div className="group flex cursor-pointer items-center gap-2 hover:text-sky-500">
        <span className="font-semibold">
          {selectedProject ? selectedProject.title : "All Projects"}
        </span>
        <span className="rounded-md bg-slate-700 px-1.5 py-0.5 text-sm font-semibold text-white group-hover:bg-sky-700 max-sm:hidden">
          {totalTasks}
        </span>
        <KeyboardArrowDown />
      </div>
    </div>
  );
};

export default ProjectSelector;
