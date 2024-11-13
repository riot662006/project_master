import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { selectProjects } from "@/store/Selectors";
import {
  getTaskPageSelectedProject,
  setSelectedProject,
} from "@/store/slices/tasksPageSlice";
import { allProjectIcons } from "@/utils/projectIcons";
import { DensitySmall, KeyboardArrowDown } from "@mui/icons-material";
import { useRef } from "react";

const ProjectSelector = () => {
  const selectedProject = useAppSelector(getTaskPageSelectedProject);
  const projects = useAppSelector(selectProjects("name"));
  const dispatch = useAppDispatch();

  const totalTasks = selectedProject
    ? selectedProject.tasks.length
    : projects.reduce((acc: number, project) => acc + project.tasks.length, 0);

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuActive, setIsMenuActive] = useDetectOutsideClick(menuRef, false);
  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  const selectProject = (projectId: string) => {
    setIsMenuActive(false);
    dispatch(setSelectedProject(projectId));
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className="group flex cursor-pointer items-center gap-2 hover:text-sky-500"
        onClick={toggleMenu}
      >
        <span className="font-semibold">
          {selectedProject ? selectedProject.title : "All Projects"}
        </span>
        <span className="rounded-md bg-slate-700 px-1.5 py-0.5 text-sm font-semibold text-white group-hover:bg-sky-700 max-sm:hidden">
          {totalTasks}
        </span>
        <KeyboardArrowDown />
      </button>
      <nav
        className={`absolute left-0 top-10 z-40 max-md:left-auto max-md:right-0 ${isMenuActive ? "block" : "hidden"} max-h-[45vh] overflow-y-auto rounded-xl border border-gray-200 bg-white px-4 shadow-md`}
        aria-labelledby="sortMenu"
      >
        <ul className="flex w-48 flex-col gap-2 py-4">
          <div
            className={`flex items-center gap-4 p-2 py-4 ${!selectedProject ? "rounded-lg border border-sky-500 bg-sky-100" : ""} cursor-pointer hover:text-sky-500`}
            onClick={() => selectProject("")}
          >
            <DensitySmall fontSize="small" className="text-sky-500" />
            <h4>All Projects</h4>
          </div>
          <hr className="w-full self-center py-1" />
          {projects.map((project) => {
            const Icon =
              allProjectIcons.find((icon) => icon.name == project.icon)
                ?.IconComponent ?? allProjectIcons[0].IconComponent;

            return (
              <div
                key={project.id}
                className={`flex items-center gap-4 p-2 ${selectedProject?.id == project.id ? "rounded-lg border border-sky-500 bg-sky-100" : ""} cursor-pointer hover:text-sky-500`}
                onClick={() => selectProject(project.id)}
              >
                <Icon fontSize="small" className="text-sky-500" />
                <h5>{project.title}</h5>
              </div>
            );
          })}
        </ul>
      </nav>
    </div>
  );
};

export default ProjectSelector;
