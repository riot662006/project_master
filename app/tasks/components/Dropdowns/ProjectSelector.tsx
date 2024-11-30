import {
  useAppDispatch,
  useAppSelector,
  useSortedProjects,
  useTasks,
} from "@/hooks/useStoreHooks";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { setSelectedProject } from "@/store/slices/tasksPageSlice";
import { allProjectIcons } from "@/utils/projectIcons";
import { DensitySmall, KeyboardArrowDown } from "@mui/icons-material";
import { useRef } from "react";

const ProjectSelector = () => {
  const dispatch = useAppDispatch();

  // Get the selected project ID from the Redux store
  const selectedProjectId = useAppSelector(
    (state) => state.tasksPage.selectedProjectId,
  );

  // Fetch sorted projects and tasks for the selected project
  const { projects } = useSortedProjects();
  const { tasks } = useTasks(selectedProjectId);

  // Determine the selected project and its task count
  const selectedProject = selectedProjectId
    ? projects.find((project) => project.id === selectedProjectId)
    : null;
  const selectedProjectCount = tasks.length;

  // Handle dropdown menu interactions
  const menuRef = useRef<HTMLDivElement>(null);
  const {
    isActive: isMenuActive,
    toggleMenu,
    closeMenu,
  } = useDetectOutsideClick(menuRef, false);

  // Handle project selection
  const selectProject = (projectId: string) => {
    closeMenu();
    dispatch(setSelectedProject(projectId));
  };

  return (
    <div className="relative w-fit" ref={menuRef}>
      {/* Dropdown Toggle Button */}
      <button
        className="group flex cursor-pointer items-center gap-2 hover:text-sky-500"
        onClick={toggleMenu}
      >
        <span className="font-semibold">
          {selectedProject?.title ?? "All Projects"}
        </span>
        <span className="rounded-md bg-slate-700 px-1.5 py-0.5 text-sm font-semibold text-white group-hover:bg-sky-700 max-sm:hidden">
          {selectedProjectCount}
        </span>
        <KeyboardArrowDown />
      </button>

      {/* Dropdown Menu */}
      <nav
        className={`absolute left-0 top-10 z-30 max-md:left-auto max-md:right-0 ${
          isMenuActive ? "block" : "hidden"
        } max-h-[45vh] overflow-y-auto rounded-xl border border-gray-200 bg-white px-4 shadow-md`}
        aria-labelledby="projectMenu"
      >
        <ul className="flex w-48 flex-col gap-2 py-4">
          {/* Option to Show All Projects */}
          <div
            className={`flex items-center gap-4 p-2 py-4 ${
              !selectedProjectId
                ? "rounded-lg border border-sky-500 bg-sky-100"
                : ""
            } cursor-pointer hover:text-sky-500`}
            onClick={() => selectProject("")}
          >
            <DensitySmall fontSize="small" className="text-sky-500" />
            <h4>All Projects</h4>
          </div>

          <hr className="w-full self-center py-1" />

          {/* Project List */}
          {projects.map((project) => {
            const Icon =
              allProjectIcons.find((icon) => icon.name === project.icon)
                ?.IconComponent ?? allProjectIcons[0].IconComponent;

            return (
              <div
                key={project.id}
                className={`flex items-center gap-4 p-2 ${
                  selectedProjectId === project.id
                    ? "rounded-lg border border-sky-500 bg-sky-100"
                    : ""
                } cursor-pointer hover:text-sky-500`}
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
