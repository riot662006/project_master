import ProjectIcon from "@/app/components/ProjectIcon";
import { allProjectIcons } from "@/app/utils/projectIcons";
import { useAppContext } from "@/app/utils/AppContext";
import { Apps } from "@mui/icons-material";
import { IconData } from "@/app/utils/types";
import { useWatch } from "react-hook-form";

const SelectProjectIconSection = () => {
  const { addProjectModalObj } = useAppContext();
  const { setMode, formData } = addProjectModalObj;

  const icon_id = useWatch({ control: formData.control, name: "icon_id" });

  const Header = () => {
    return (
      <div className="flex w-full items-center">
        <div className="flex items-center gap-2">
          <div className="flex items-center justify-center rounded-md bg-sky-100 p-2">
            <Apps sx={{ fontSize: "18px" }} className="text-sky-500" />
          </div>
          <span className="text-md font-bold">All Icons</span>
        </div>
      </div>
    );
  };

  const IconCollection = () => {
    const selectIcon = (id: number) => {
      formData.setValue("icon_id", id);
      setMode("default");
    };

    return (
      <ul className="flex h-60 w-full flex-wrap gap-4 overflow-auto overflow-y-auto bg-slate-100 p-4">
        {allProjectIcons.map((iconData: IconData) => (
          <button
            key={`project-icon-${iconData.id}`}
            onClick={() => selectIcon(iconData.id)}
          >
            <ProjectIcon
              id={iconData.id}
              outerClassName={`flex item-center justify-center p-2 ${icon_id == iconData.id ? "bg-sky-600 text-white" : "bg-white text-sky-500"} rounded-md cursor-pointer hover:text-white hover:bg-sky-500 `}
            />
          </button>
        ))}
      </ul>
    );
  };

  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-2">
        <span className="text-xs">
          {"Please select the icons you'd like to use from the collection below:"}
        </span>
        <IconCollection />
      </div>
    </>
  );
};

export default SelectProjectIconSection;
