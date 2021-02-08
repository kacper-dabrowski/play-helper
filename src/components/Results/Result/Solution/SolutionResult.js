import React from 'react';

const SolutionResult = ({ title, description, man, woman, company }) => {
    return (
        <div>
            <p>{title}</p>
            <p>{description}</p>
            <p>{man}</p>
            <p>{woman}</p>
            <p>{company}</p>
        </div>
    );
};

export default SolutionResult;
