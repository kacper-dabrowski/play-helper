import React from 'react';
import { EditButtons } from '../../../Buttons/EditButtons/EditButtons';
import { PublicIcon } from '../../../UI/Icons/PublicIcon';
import { StyledResultContainer } from '../StyledResult';

export const SolutionResult = ({
    id,
    clickable,
    title,
    description,
    content,
    setTemplate,
    onRemove,
    isPublic,
    isAuthor,
    onToggleEdit,
}) => {
    let editButtons;

    if (isAuthor) {
        editButtons = <EditButtons onRemove={onRemove} id={id} onToggleEdit={onToggleEdit} />;
    }

    return (
        <StyledResultContainer clickable={clickable} onClick={() => setTemplate?.(content)}>
            {isPublic ? <PublicIcon title="Ta pozycja jest dostępna w widoku publicznym" /> : null}
            {editButtons}
            <h3>{title}</h3>
            <p>{description}</p>
        </StyledResultContainer>
    );
};
