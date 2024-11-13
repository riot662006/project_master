import { useAppDispatch, useAppSelector } from "@/hooks/storeHooks";
import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { setSortState } from "@/store/slices/projectsSlice";
import { ProjectSortMode } from "@/utils/types";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useCallback, useRef, useState } from "react";

const ProjectSortingOptions = () => {
  const dispatch = useAppDispatch();
  const curSortState = useAppSelector((state) => state.projects.sortState);

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuActive, toggleMenu, closeMenu] = useDetectOutsideClick(menuRef, false);

  const [options] = useState([
    {
      id: 1,
      name: "Name",
      option: "A-Z",
      reverseOption: "Z-A",
      sortMode: "name" as ProjectSortMode,
    },
    {
      id: 2,
      name: "Date",
      option: "Oldest first",
      reverseOption: "Recent first",
      sortMode: "date" as ProjectSortMode,
    },
    {
      id: 3,
      name: "Status",
      option: "Pending first",
      reverseOption: "Completed first",
      sortMode: "status" as ProjectSortMode,
    },
  ]);

  const getCurButtonTitle = useCallback(() => {
    const curOptionGroup = options.find(
      (optionGroup) => optionGroup.sortMode == curSortState.mode,
    );
    if (curOptionGroup) {
      return curSortState.reverse
        ? curOptionGroup.reverseOption
        : curOptionGroup.option;
    }

    return null;
  }, [options, curSortState]);

  const sortBy = (mode: ProjectSortMode, reverse: boolean) => {
    closeMenu();
    dispatch(setSortState({ mode, reverse }));
  };

  return (
    <div className="relative" ref={menuRef}>
      <button
        className={`flex items-center gap-1 ${isMenuActive ? "font-semibold text-sky-500" : "text-slate-800 hover:font-semibold hover:text-sky-500"} `}
        onClick={toggleMenu}
      >
        <span className="flex items-center justify-end font-semibold">
          {getCurButtonTitle()}
        </span>
        <KeyboardArrowDown />
      </button>
      <nav
        className={`absolute left-0 top-10 z-40 max-md:left-auto max-md:right-0 ${isMenuActive ? "block" : "hidden"} max-h-[45vh] overflow-y-auto rounded-xl border border-gray-200 bg-white bg-opacity-90 shadow-md`}
        aria-labelledby="sortMenu"
      >
        <ul className="flex w-48 flex-col gap-2 py-8">
          {options.map((optionGroup) => (
            <li key={optionGroup.id} className="flex flex-col gap-2">
              <h4 className="px-4 font-bold">{optionGroup.name}</h4>
              <ul className="flex flex-col">
                <li
                  className={`cursor-pointer rounded px-8 py-2 hover:bg-gray-100 ${curSortState.mode == optionGroup.sortMode && curSortState.reverse == false ? "font-semibold text-sky-500" : ""}`}
                  onClick={() => sortBy(optionGroup.sortMode, false)}
                >
                  {optionGroup.option}
                </li>
                <li
                  className={`cursor-pointer rounded px-8 py-2 hover:bg-gray-100 ${curSortState.mode == optionGroup.sortMode && curSortState.reverse == true ? "font-semibold text-sky-500" : ""}`}
                  onClick={() => sortBy(optionGroup.sortMode, true)}
                >
                  {optionGroup.reverseOption}
                </li>
              </ul>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProjectSortingOptions;
