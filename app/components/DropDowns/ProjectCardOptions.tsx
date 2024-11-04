import { useDetectOutsideClick } from "@/app/utils/hooks/useDetectOutsideClick";
import { Delete, EditOutlined, MoreVert } from "@mui/icons-material";
import { useRef, useState } from "react";

const ProjectCardOptions = () => {
  const [options, setOptions] = useState([
    {
      id: 1,
      name: "Edit",
      icon: <EditOutlined />,
      hoverColor: "text-orange-500",
    },
    { id: 2, name: "Delete", icon: <Delete />, hoverColor: "text-red-500" },
  ]);

  const menuRef = useRef<HTMLDivElement>(null);
  const [isActive, setIsActive] = useDetectOutsideClick(menuRef, false);
  const toggleActive = () => setIsActive(!isActive);

  return (
    <div
      className="relative flex flex-none items-center justify-center"
      ref={menuRef}
    >
      <button
        onClick={toggleActive}
        className="flex cursor-pointer items-center justify-center rounded-sm p-2 hover:bg-slate-100"
      >
        <MoreVert fontSize="small" className="text-slate-400" />
      </button>
      <nav
        className={`z-90 absolute left-0 top-10 max-sm:left-auto max-sm:right-0 ${isActive ? "block" : "hidden"} rounded-xl bg-white bg-opacity-90 shadow-md`}
      >
        <ul className="flex w-36 flex-col py-2">
          {options.map((option) => (
            <li
              key={option.id}
              className={`flex cursor-pointer items-center gap-2 p-4 text-slate-400 hover:${option.hoverColor} hover:bg-slate-100`}
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
