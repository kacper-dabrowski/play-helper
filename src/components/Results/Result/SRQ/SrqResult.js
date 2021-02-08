import React from 'react';
import { StyledResultContainer } from '../StyledResult';

const SrqResult = ({ title, description, department, onClick, clickable }) => {
    return (
        <StyledResultContainer onClick={onClick} clickable={clickable}>
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{department}</p>
        </StyledResultContainer>
    );
};

export default SrqResult;
