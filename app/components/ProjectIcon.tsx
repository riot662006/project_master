// ProjectIcon.tsx
import React from "react";
import { SxProps } from "@mui/system";
import { allProjectIcons, IconName } from "../utils/projectIcons";

interface ProjectIconProps {
  id?: number;
  name?: IconName;
  sx?: SxProps;
  innerClassName?: string;
  outerClassName?: string;
}

const ProjectIcon: React.FC<ProjectIconProps> = ({
  id,
  name,
  sx,
  innerClassName,
  outerClassName,
}) => {
  // Find icon data by id or name
  const iconData = id
    ? allProjectIcons.find((icon) => icon.id === id)
    : name
      ? allProjectIcons.find((icon) => icon.name === name)
      : null;

  if (!iconData) {
    return null; // Return null if no matching icon found
  }

  // Extract the icon component from iconData
  const { IconComponent } = iconData;

  return (
    <div className={`${outerClassName}`}>
      <IconComponent className={innerClassName} sx={sx} />
    </div>
  );
};

export default ProjectIcon;
