import React from 'react';
import IconButton from '../../../../IconButton/IconButton';
import cancelIcon from '../../../../../assets/icons/cancel.svg';
import { StyledResultContainer } from '../../StyledResult';

const SolutionResultWithButtons = ({ id, title, description, onRemove, isPublic }) => {
    return (
        <StyledResultContainer>
            <IconButton
                src={cancelIcon}
                width="1.5rem"
                height="1.5rem"
                top="1rem"
                right="1rem"
                onClick={() => onRemove(id)}
            />
            <h3>{title}</h3>
            <p>{description}</p>
            {isPublic && <p>Publiczny</p>}
        </StyledResultContainer>
    );
};

export default SolutionResultWithButtons;
