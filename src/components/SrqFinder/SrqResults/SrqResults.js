import React from 'react';
import { StyledSrqResults } from './StyledSrqResults';
import SrqResult from './SrqResult/SrqResult';
import Spinner from '../../Spinner/Spinner';
import CustomResult from './SrqResult/CustomResult/CustomResult';
import urls from '../../../shared/urls';
import axios from '../../../axios';

const SrqResults = ({ supportRequests, error, isLoading, onCopy, editable, clickable, refresh }) => {
    const srqRemovedHandler = async (id) => {
        await axios.delete(`${urls.srq}/${id}`);
        refresh();
    };

    if (error) {
        return (
            <StyledSrqResults>
                <p>{error.message}</p>
            </StyledSrqResults>
        );
    }

    if (isLoading) {
        return (
            <StyledSrqResults>
                <Spinner centered />
            </StyledSrqResults>
        );
    }
    let renderedContent;

    if (!editable) {
        renderedContent = supportRequests.map(({ _id, content, title, description, department }) => (
            <SrqResult
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
            <CustomResult
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

    return <StyledSrqResults>{renderedContent}</StyledSrqResults>;
};

export default SrqResults;
