import React from 'react';
import { StyledSrqResults } from './StyledSrqResults';
import SrqResult from './SrqResult/SrqResult';
import Spinner from '../../../../../components/Spinner/Spinner';

const SrqResults = ({ supportRequests, error, isLoading, setTemplate }) => {
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

    return (
        <StyledSrqResults>
            {supportRequests.map(({ title, description, department, content, _id }) => (
                <SrqResult
                    onClick={() => setTemplate(content)}
                    key={_id}
                    content={content}
                    title={title}
                    description={description}
                    department={department}
                />
            ))}
        </StyledSrqResults>
    );
};

export default SrqResults;
