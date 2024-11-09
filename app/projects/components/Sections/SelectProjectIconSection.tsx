import ProjectIcon from "@/components/ProjectIcon";
import { allProjectIcons } from "@/utils/projectIcons";
import { IconData } from "@/utils/types";

const SelectProjectIconSection = ({
  curIconId,
  onIconSelect,
}: {
  curIconId: number;
  onIconSelect: (id: number) => void;
}) => {
  return (
    <div className="flex w-full flex-col gap-2">
      <span className="text-xs">
        Please select the icon you&apos;d like to use from the collection
        below:
      </span>
      <ul className="flex h-60 w-full flex-wrap gap-4 overflow-auto bg-slate-100 p-4">
        {allProjectIcons.map((iconData: IconData) => (
          <button
            key={`project-icon-${iconData.id}`}
            onClick={() => onIconSelect(iconData.id)}
            className={`flex items-center justify-center p-2 ${
              iconData.id === curIconId
                ? "bg-sky-600 text-white"
                : "bg-white text-sky-500"
            } cursor-pointer rounded-md hover:bg-sky-500 hover:text-white`}
          >
            <ProjectIcon id={iconData.id} />
          </button>
        ))}
      </ul>
    </div>
);
};

export default SelectProjectIconSection;
