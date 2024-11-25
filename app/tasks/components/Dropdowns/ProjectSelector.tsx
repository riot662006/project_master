import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { selectProjects, selectTasks } from "@/store/Selectors";
import { setSelectedProject } from "@/store/slices/tasksPageSlice";
import { allProjectIcons } from "@/utils/projectIcons";
import { DensitySmall, KeyboardArrowDown } from "@mui/icons-material";
import { useRef } from "react";

const ProjectSelector = () => {
  const dispatch = useAppDispatch();

  const selectedProjectId = useAppSelector(
    (state) => state.tasksPage.selectedProjectId,
  );
  const projects = useAppSelector(selectProjects("name"));
  const selectedProject = projects.find(
    (project) => project.id == selectedProjectId,
  );

  const taskObjs = useAppSelector(selectTasks(selectedProjectId));

  const menuRef = useRef<HTMLDivElement>(null);
  const {
    isActive: isMenuActive,
    toggleMenu,
    closeMenu,
  } = useDetectOutsideClick(menuRef, false);

  const selectProject = (projectId: string) => {
    closeMenu();
    dispatch(setSelectedProject(projectId));
  };

  return (
    <div className="relative w-fit" ref={menuRef}>
      <button
        className="group flex cursor-pointer items-center gap-2 hover:text-sky-500"
        onClick={toggleMenu}
      >
        <span className="font-semibold">
          {selectedProject ? selectedProject.title : "All Projects"}
        </span>
        <span className="rounded-md bg-slate-700 px-1.5 py-0.5 text-sm font-semibold text-white group-hover:bg-sky-700 max-sm:hidden">
          {taskObjs.length}
        </span>
        <KeyboardArrowDown />
      </button>
      <nav
        className={`absolute left-0 top-10 z-30 max-md:left-auto max-md:right-0 ${isMenuActive ? "block" : "hidden"} max-h-[45vh] overflow-y-auto rounded-xl border border-gray-200 bg-white px-4 shadow-md`}
        aria-labelledby="sortMenu"
      >
        <ul className="flex w-48 flex-col gap-2 py-4">
          <div
            className={`flex items-center gap-4 p-2 py-4 ${!selectedProjectId ? "rounded-lg border border-sky-500 bg-sky-100" : ""} cursor-pointer hover:text-sky-500`}
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
                className={`flex items-center gap-4 p-2 ${selectedProjectId == project.id ? "rounded-lg border border-sky-500 bg-sky-100" : ""} cursor-pointer hover:text-sky-500`}
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
