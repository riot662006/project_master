import { useDetectOutsideClick } from "@/hooks/useDetectOutsideClick";
import { Delete, EditOutlined, MoreVert } from "@mui/icons-material";
import { useRef, useState } from "react";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { setConfirmDeleteModal } from "@/store/slices/confirmDeleteModalSlice";
import { openEditProjectModal } from "@/store/slices/addProjectModalSlice";
import { SerializableProject } from "@/utils/types";

const ProjectCardOptions = ({ project }: { project: SerializableProject }) => {
  const dispatch = useAppDispatch();

  const menuRef = useRef<HTMLDivElement>(null);
  const {
    isActive: isMenuActive,
    toggleMenu,
    closeMenu,
  } = useDetectOutsideClick(menuRef, false);

  const confirmDelete = () => {
    dispatch(
      setConfirmDeleteModal({
        isOpen: true,
        projectOrTaskId: project.id,
        idType: "project",
      }),
    );
  };

  const editOptionClicked = () => {
    closeMenu();
    dispatch(openEditProjectModal(project.id));
  };

  const deleteOptionClicked = () => {
    closeMenu();
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
        className={`absolute left-0 top-10 z-30 max-sm:left-auto max-sm:right-0 ${isMenuActive ? "block" : "hidden"} rounded-xl bg-white bg-opacity-90 shadow-md`}
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
