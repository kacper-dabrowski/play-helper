import React from 'react';
import { StyledSrqResultContainer } from './StyledSrqResult';

const SrqResult = ({ title, description, department, onClick, clickable }) => {
    return (
        <StyledSrqResultContainer onClick={onClick} clickable={clickable}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{department}</p>
        </StyledSrqResultContainer>
    );
};

export default SrqResult;
