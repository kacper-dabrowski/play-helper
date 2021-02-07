import React from 'react';
import IconButton from '../../../../IconButton/IconButton';
import { StyledSrqResultContainer } from '../StyledSrqResult';
import cancelIcon from '../../../../../assets/icons/cancel.svg';

const CustomResult = ({ id, title, description, department, onClick }) => {
    return (
        <StyledSrqResultContainer>
            <IconButton
                src={cancelIcon}
                width="1.5rem"
                height="1.5rem"
                top="1rem"
                right="1rem"
                onClick={() => onClick(id)}
            />
            <h3>{title}</h3>
            <p>{description}</p>
            <p>{department}</p>
        </StyledSrqResultContainer>
    );
};

export default CustomResult;
