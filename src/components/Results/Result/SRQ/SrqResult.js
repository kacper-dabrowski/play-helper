import React, { useCallback } from 'react';
import { EditButtons } from '../../../Buttons/EditButtons/EditButtons';
import { StyledResultContainer } from '../StyledResult';

const SrqResult = ({
    id,
    title,
    content,
    toggleEditMode,
    setFieldsToPopulate,
    onRemove,
    description,
    department,
    onClick,
    clickable,
    editable,
}) => {
    const toggleEditModeAndPopulateFields = useCallback(() => {
        toggleEditMode?.(true);
        setFieldsToPopulate?.({ title, description, department, content, srqId: id });
    }, [toggleEditMode, setFieldsToPopulate, title, description, department, content, id]);

    let editButtons;

    if (editable) {
        editButtons = <EditButtons onRemove={() => onRemove(id)} onToggleEdit={toggleEditModeAndPopulateFields} />;
    }

    return (
        <StyledResultContainer onClick={onClick} clickable={clickable}>
            {editButtons}
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{department}</p>
        </StyledResultContainer>
    );
};

export default SrqResult;
