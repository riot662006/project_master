import { useAppContext } from "@/app/utils/AppContext";
import { useDetectOutsideClick } from "@/app/utils/hooks/useDetectOutsideClick";
import { Project } from "@/app/utils/types";
import { Delete, EditOutlined, MoreVert } from "@mui/icons-material";
import { useRef, useState } from "react";

const ProjectCardOptions = ({ project }: { project: Project }) => {
  const { confirmProjectDeleteModalObj } = useAppContext();
  const { setIsOpen, setProjectId } = confirmProjectDeleteModalObj;

  const confirmDelete = () => {
    setIsOpen(true);
    setProjectId(project.id);
  };

  const menuRef = useRef<HTMLDivElement>(null);
  const [isMenuActive, setIsMenuActive] = useDetectOutsideClick(menuRef, false);

  const toggleMenu = () => setIsMenuActive(!isMenuActive);
  const deleteOptionClicked = () => {
    setIsMenuActive(false);
    confirmDelete();
  };

  const [ options ] = useState([
    {
      id: 1,
      name: "Edit",
      icon: <EditOutlined />,
      hoverColor: "text-sky-500",
      onClick: () => {},
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
        className={`z-90 absolute left-0 top-10 max-sm:left-auto max-sm:right-0 ${isMenuActive ? "block" : "hidden"} rounded-xl bg-white bg-opacity-90 shadow-md`}
      >
        <ul className="flex w-36 flex-col py-2">
          {options.map((option) => (
            <li
              key={option.id}
              className={`flex cursor-pointer items-center gap-2 p-4 text-slate-400 hover:${option.hoverColor} hover:bg-slate-100`}
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
