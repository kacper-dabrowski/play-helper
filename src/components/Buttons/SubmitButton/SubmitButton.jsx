import React from 'react';
import { StyledSubmitButton } from './StyledSubmitButton';

const SubmitButton = ({ onClick, title, disabled }) => (
    <StyledSubmitButton disabled={disabled} onClick={onClick} type="submit">
        {title}
    </StyledSubmitButton>
);

export default SubmitButton;
