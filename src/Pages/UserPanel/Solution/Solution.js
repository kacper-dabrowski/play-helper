import React from 'react';
import SolutionForm from '../../../components/Forms/SolutionForm/SolutionForm';
import Searchbar from '../../../components/SearchBar/SearchBar';
import { StyledResults } from '../../../components/SrqFinder/SrqResults/StyledSrqResults';
import { SolutionFinderContainer } from './StyledSolution';

const Solution = () => {
    return (
        <>
            <SolutionForm />
            <SolutionFinderContainer>
                <Searchbar />
                <StyledResults>siema</StyledResults>
            </SolutionFinderContainer>
        </>
    );
};

export default Solution;
