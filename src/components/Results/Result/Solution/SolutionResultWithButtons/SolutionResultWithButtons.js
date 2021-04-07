import React from 'react';
import cancelIcon from '../../../../../assets/icons/cancel.svg';
import pencilIcon from '../../../../../assets/icons/pencil.png';
import IconButton from '../../../../Buttons/IconButton/IconButton';
import { StyledResultContainer } from '../../StyledResult';

const SolutionResultWithButtons = ({ id, title, description, onRemove, isPublic, isAuthor, onToggleEdit }) => {
    return (
        <StyledResultContainer>
            {isAuthor && (
                <>
                    <IconButton
                        src={cancelIcon}
                        width="1.5rem"
                        height="1.5rem"
                        top="1rem"
                        right="1rem"
                        onClick={() => onRemove(id)}
                    />
                    <IconButton
                        src={pencilIcon}
                        width="1.5rem"
                        height="1.5rem"
                        bottm="1rem"
                        right="1rem"
                        onClick={onToggleEdit}
                    />
                </>
            )}
            <h3>{title}</h3>
            <p>{description}</p>
            {isPublic && <p>Publiczny</p>}
        </StyledResultContainer>
    );
};

export default SolutionResultWithButtons;
