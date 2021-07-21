import cogoToast from 'cogo-toast';
import React, { useEffect, useState } from 'react';
import SolutionEditableForm from '../../../components/Forms/SolutionForm/SolutionEditableForm';
import SolutionForm from '../../../components/Forms/SolutionForm/SolutionForm';
import { SolutionResult } from '../../../components/Results/Result/Solution/SolutionResult';
import Searchbar from '../../../components/SearchBar/SearchBar';
import { StyledResults } from '../../../components/SrqFinder/SrqResults/StyledSrqResults';
import Spinner from '../../../components/UI/Spinner/Spinner';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import useResultsFilter from '../../../hooks/useResultsFilter';
import urls from '../../../shared/urls';
import { solutionSearchMethod } from '../../Support/Solutions/Solutions';
import { SolutionFinderContainer } from './StyledSolution';

const Solution = () => {
    const { error, response, loading, requestHandler } = useRequest(urls.solution);
    const { requestHandler: deleteRequestHandler, error: deleteRequestError } = useRequest(
        urls.solution,
        REQUEST_METHODS.DELETE
    );
    const [editMode, setEditMode] = useState(false);
    const [fieldsToPopulate, setFieldsToPopulate] = useState({});
    const results = response?.data || [];
    const [filteredSolutions, searchQuery, setSearchQuery] = useResultsFilter(results, solutionSearchMethod);

    const toggleEditModeAndPopulateFields = (solution) => {
        setEditMode(true);
        setFieldsToPopulate(solution);
    };

    const removeSolutionHandler = async (id) => {
        try {
            await deleteRequestHandler(null, () => `${urls.solution}/${id}`);

            await requestHandler?.();

            if (deleteRequestError) {
                throw deleteRequestError;
            }

            cogoToast.success('Rozwiązanie usunięto pomyślnie');
        } catch (deletionError) {
            cogoToast.error(error.message);
        }
    };
    let content;

    useEffect(() => {
        if (error) {
            cogoToast.error(error.message);
        }
    }, [error]);

    if (loading) {
        content = <Spinner centered />;
    } else {
        content = filteredSolutions.map((solution) => (
            <SolutionResult
                key={solution._id}
                title={solution.title}
                isPublic={solution.isPublic}
                description={solution.description}
                id={solution._id}
                onRemove={removeSolutionHandler}
                onToggleEdit={() => toggleEditModeAndPopulateFields({ ...solution, id: solution._id })}
                isAuthor={solution.isAuthor}
            />
        ));
    }
    return (
        <>
            {editMode ? (
                <SolutionEditableForm
                    populatedFields={fieldsToPopulate}
                    refresh={requestHandler}
                    setEditMode={setEditMode}
                />
            ) : (
                <SolutionForm refresh={requestHandler} />
            )}
            <SolutionFinderContainer>
                <Searchbar onType={setSearchQuery} value={searchQuery} />
                <StyledResults>{content}</StyledResults>
            </SolutionFinderContainer>
        </>
    );
};

export default Solution;
