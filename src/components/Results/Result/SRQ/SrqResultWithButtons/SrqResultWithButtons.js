import React from 'react';
import IconButton from '../../../../Buttons/IconButton/IconButton';
import cancelIcon from '../../../../../assets/icons/cancel.svg';
import pencilIcon from '../../../../../assets/icons/pencil.png';
import { StyledResultContainer } from '../../StyledResult';

const SrqResultWithButtons = ({
    id,
    title,
    description,
    department,
    toggleEditMode,
    setFieldsToPopulate,
    onRemove,
    content,
}) => {
    const toggleEditModeAndPopulateFields = () => {
        toggleEditMode(true);
        setFieldsToPopulate({ title, description, department, content, srqId: id });
    };
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
            <IconButton
                src={pencilIcon}
                width="1.5rem"
                height="1.5rem"
                bottm="1rem"
                right="1rem"
                onClick={toggleEditModeAndPopulateFields}
            />
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{department}</p>
        </StyledResultContainer>
    );
};

export default SrqResultWithButtons;
