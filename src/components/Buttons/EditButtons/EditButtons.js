import React from 'react';
import cancelIcon from '../../../assets/icons/cancel.svg';
import pencilIcon from '../../../assets/icons/pencil.png';
import IconButton from '../IconButton/IconButton';

export const EditButtons = ({ onToggleEdit, onRemove, id }) => {
    return (
        <>
            <IconButton
                title="Usuń pozycję"
                src={cancelIcon}
                width="1.5rem"
                height="1.5rem"
                top="1rem"
                right="1rem"
                onClick={() => onRemove(id)}
            />
            <IconButton
                title="Edytuj pozycję"
                src={pencilIcon}
                width="1.5rem"
                height="1.5rem"
                top="3rem"
                right="1rem"
                onClick={onToggleEdit}
            />
        </>
    );
};
