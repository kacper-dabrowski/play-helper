import React from 'react';
import { Link } from 'react-router-dom';

import { StyledProjectTile, ProjectIcon } from './StyledProjectTile';

const ProjectTile = ({ projectLogo, projectText, projectColorDark, projectColorBright, projectEndpoint }) => (
    <Link to={projectEndpoint}>
        <StyledProjectTile colorDark={projectColorDark} colorBright={projectColorBright}>
            <ProjectIcon src={projectLogo} alt={projectText} />
        </StyledProjectTile>
    </Link>
);

export default ProjectTile;
