import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { Project } from "@/utils/types";
import { Delete, EditOutlined, MoreVert } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useAppDispatch } from "@/hooks/storeHooks";
import {
  setConfirmDeleteModalOpen,
  setProjectToDelete,
} from "@/store/slices/confirmDeleteProjectModalSlice";
import { openEditProjectModal } from "@/store/slices/addProjectModalSlice";

const ProjectCardOptions = ({ project }: { project: Project }) => {
  const dispatch = useAppDispatch();

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuActive, setIsMenuActive] = useDetectOutsideClick(menuRef, false);

  const confirmDelete = () => {
    dispatch(setProjectToDelete(project.id));
    dispatch(setConfirmDeleteModalOpen(true));
  };

  const toggleMenu = () => setIsMenuActive(!isMenuActive);

  const editOptionClicked = () => {
    setIsMenuActive(false);
    dispatch(openEditProjectModal(project.id));
  };

  const deleteOptionClicked = () => {
    setIsMenuActive(false);
    confirmDelete();
  };

  const [options] = useState([
    {
      id: 1,
      name: "Edit",
      icon: <EditOutlined />,
      hoverColor: "text-sky-500",
      onClick: editOptionClicked,
    },
    {
      id: 2,
      name: "Delete",
      icon: <Delete />,
      hoverColor: "text-red-500",
      onClick: deleteOptionClicked,
    },
  ]);

  return (
    <div
      className="relative flex flex-none items-center justify-center"
      ref={menuRef}
    >
      <button
        onClick={toggleMenu}
        className="flex cursor-pointer items-center justify-center rounded-sm p-2 hover:bg-slate-100"
      >
        <MoreVert fontSize="small" className="text-slate-400" />
      </button>
      <nav
        className={`z-40 absolute left-0 top-10 max-sm:left-auto max-sm:right-0 ${isMenuActive ? "block" : "hidden"} rounded-xl bg-white bg-opacity-90 shadow-md`}
      >
        <ul className="flex w-36 flex-col py-2">
          {options.map((option) => (
            <li
              key={option.id}
              className={`flex cursor-pointer items-center gap-2 p-4 text-slate-400 hover:bg-slate-100 hover:${option.hoverColor}`}
              onClick={option.onClick}
            >
              {option.icon}
              <span className="text-sm">{option.name}</span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
};

export default ProjectCardOptions;
