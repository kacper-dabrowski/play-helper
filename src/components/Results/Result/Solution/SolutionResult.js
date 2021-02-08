import React from 'react';
import { ResultButtonWrapper, StyledResultContainer, ResultButton } from '../StyledResult';

const SolutionResult = ({ title, description, man, woman, company, setTemplate }) => {
    return (
        <StyledResultContainer>
            <h3>{title}</h3>
            <p>{description}</p>
            <ResultButtonWrapper>
                <ResultButton onClick={() => setTemplate(man)}>Pan</ResultButton>
                <ResultButton onClick={() => setTemplate(woman)}>Pani</ResultButton>
                <ResultButton onClick={() => setTemplate(company)}>Spółka</ResultButton>
            </ResultButtonWrapper>
        </StyledResultContainer>
    );
};

export default SolutionResult;
