import React from 'react';
import { StyledConfirmButton } from './StyledConfirmButton';

const ConfirmButton = ({ title, ...restProps }) => (
    <StyledConfirmButton {...restProps}>{title || 'Zatwierdź'}</StyledConfirmButton>
);

export default ConfirmButton;
