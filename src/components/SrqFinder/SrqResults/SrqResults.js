import React from 'react';
import { StyledResults } from './StyledSrqResults';
import Result from '../../Results/Result/Result';
import Spinner from '../../Spinner/Spinner';
import ResultWithButtons from '../../Results/Result/ResultWithButtons/ResultWithButtons';
import urls from '../../../shared/urls';
import axios from '../../../axios';

const SrqResults = ({ supportRequests, error, isLoading, onCopy, editable, clickable, refresh }) => {
    const srqRemovedHandler = async (id) => {
        await axios.delete(`${urls.srq}/${id}`);
        refresh();
    };

    if (error) {
        return (
            <StyledResults>
                <p>{error.message}</p>
            </StyledResults>
        );
    }

    if (isLoading) {
        return (
            <StyledResults>
                <Spinner centered />
            </StyledResults>
        );
    }
    let renderedContent;

    if (!editable) {
        renderedContent = supportRequests.map(({ _id, content, title, description, department }) => (
            <Result
                clickable={clickable}
                key={_id}
                title={title}
                description={description}
                department={department}
                onClick={() => onCopy(content)}
            />
        ));
    } else {
        renderedContent = supportRequests.map(({ _id, content, title, description, department }) => (
            <ResultWithButtons
                clickable={clickable}
                key={_id}
                id={_id}
                content={content}
                title={title}
                description={description}
                department={department}
                onClick={srqRemovedHandler}
            />
        ));
    }

    return <StyledResults>{renderedContent}</StyledResults>;
};

export default SrqResults;
