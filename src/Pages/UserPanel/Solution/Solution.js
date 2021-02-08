import React from 'react';
import SolutionForm from '../../../components/Forms/SolutionForm/SolutionForm';
import SolutionResultWithButtons from '../../../components/Results/Result/Solution/SolutionResultWithButtons/SolutionResultWithButtons';
import Searchbar from '../../../components/SearchBar/SearchBar';
import { StyledResults } from '../../../components/SrqFinder/SrqResults/StyledSrqResults';
import { SolutionFinderContainer } from './StyledSolution';

const Solution = () => {
    return (
        <>
            <SolutionForm />
            <SolutionFinderContainer>
                <Searchbar />
                <StyledResults>
                    <SolutionResultWithButtons
                        man="man"
                        woman="woman"
                        company="company"
                        title="title"
                        description="description"
                    />
                </StyledResults>
            </SolutionFinderContainer>
        </>
    );
};

export default Solution;
