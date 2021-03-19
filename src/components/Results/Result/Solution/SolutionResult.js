import React from 'react';
import { StyledResultContainer } from '../StyledResult';

const SolutionResult = ({ clickable, title, description, content, setTemplate, isPublic }) => {
    return (
        <StyledResultContainer clickable={clickable} onClick={() => setTemplate(content)} isPublic={isPublic}>
            <h3>{title}</h3>
            <p>{description}</p>
        </StyledResultContainer>
    );
};

export default SolutionResult;
