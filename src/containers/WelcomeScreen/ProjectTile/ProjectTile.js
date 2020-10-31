import React from "react";

import { StyledProjectTile, ProjectIcon } from "./StyledProjectTile";
const ProjectTile = ({
  projectLogo,
  projectText,
  projectColorDark,
  projectColorBright,
}) => (
  <StyledProjectTile
    colorDark={projectColorDark}
    colorBright={projectColorBright}
  >
    <ProjectIcon src={projectLogo} alt={projectText} />
  </StyledProjectTile>
);

export default ProjectTile;
