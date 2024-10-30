import ProjectIcon from "@/app/components/ProjectIcon";
import { allProjectIcons, IconData } from "@/app/utils/AllProjectIcon";
import { useAppContext } from "@/app/utils/AppContext";
import { Apps } from "@mui/icons-material";

const SelectProjectIconSection = () => {
  return (
    <>
      <Header />
      <div className="flex w-full flex-col gap-2">
        <span className="text-xs">
          Please select the icons you'd like to use from the collection below:
        </span>
        <IconCollection />
      </div>
    </>
  );
};

const Header = () => {
  const { addProjectModalObj } = useAppContext();
  const { setIsOpen } = addProjectModalObj;

  const closeModal = () => setIsOpen(false);

  return (
    <div className="flex w-full items-center">
      <div className="flex items-center gap-2">
        <div className="flex items-center justify-center rounded-md bg-orange-100 p-2">
          <Apps sx={{ fontSize: "18px" }} className="text-orange-500" />
        </div>
        <span className="text-md font-bold">All Icons</span>
      </div>
    </div>
  );
};

const IconCollection = () => {
  const { addProjectModalObj } = useAppContext();
  const { setMode } = addProjectModalObj;

  const { watch, setValue } = addProjectModalObj.formData;
  const icon_id = watch("icon_id");

  const selectIcon = (id: number) => {
    setValue("icon_id", id);
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
            outerClassName={`flex item-center justify-center p-2 ${icon_id == iconData.id ? "bg-orange-600 text-white" : "bg-white text-orange-500"} rounded-md cursor-pointer hover:text-white hover:bg-orange-500 `}
          />
        </button>
      ))}
    </ul>
  );
};
export default SelectProjectIconSection;
