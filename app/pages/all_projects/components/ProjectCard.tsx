import ProjectIcon from "@/app/components/ProjectIcon";
import { Project } from "@/app/utils/types";
import { MoreVert, Splitscreen } from "@mui/icons-material";
import Circle from "@mui/icons-material/Circle";

const ProjectCard = ({ project } : { project: Project}) => {
  const {
    title,
    icon,
  } = project;

  return (
    <div className="flex w-80 flex-col gap-8 bg-white p-7 px-10 max-sm:w-full">
      <ProjectCardHeader title={title} icon={icon}/>
      <ProjectCardBody />
      <ProjectCardFooter />
    </div>
  );
};

const ProjectCardHeader = ({ title, icon } : { title : string, icon: string}) => {
  return (
    <div className="flex items-center justify-between">
      {/* Title and Icon */}
      <div className="flex items-center gap-3">
        {/* Icon */}
        <ProjectIcon name={icon} outerClassName="flex aspect-square w-10 items-center justify-center rounded-md bg-orange-500" innerClassName="text-white" sx={{fontSize: "20px"}}/>
        {/* Title */}
        <div className="flex flex-col">
          <span className="text-m font-bold">{ title }</span>
          <span className="text-[12px] text-slate-400">2 days ago</span>
        </div>
      </div>
      {/* Options */}
      <div>
        <MoreVert fontSize="small" className="cursor-pointer text-slate-400" />
      </div>
    </div>
  );
};

const ProjectCardBody = () => {
  return (
    <ul className="ml-2 flex flex-col gap-4 text-sm text-slate-400">
      <ProjectCardBodyItem />
      <ProjectCardBodyItem />
    </ul>
  );
};

const ProjectCardBodyItem = () => {
  return (
    <li className="flex items-center gap-2">
      <Circle sx={{ fontSize: "8px" }} />
      <span>Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed</span>
    </li>
  );
};

const ProjectCardFooter = () => {
  return (
    <div className="flex flex-col gap-4">
      <ProjectProgressBar />
      <div className="flex items-center justify-between text-xs">
        <span className="text-slate-400">On Progress</span>
        <span className="font-semibold">33%</span>
      </div>
    </div>
  );
};

const ProjectProgressBar = () => {
  return (
    <div className="h-2 w-full rounded-lg bg-slate-100">
      <div className="h-2 w-[33%] rounded-lg bg-orange-500" />
    </div>
  );
};

export default ProjectCard;
