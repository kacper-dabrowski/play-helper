import React from "react";

import { StyledProjectTile, ProjectIcon } from "./StyledProjectTile";
const ProjectTile = ({ projectLogo, projectText, projectColor }) => (
  <StyledProjectTile color={projectColor}>
    <ProjectIcon src={projectLogo} alt={projectText} />
  </StyledProjectTile>
);

export default ProjectTile;
