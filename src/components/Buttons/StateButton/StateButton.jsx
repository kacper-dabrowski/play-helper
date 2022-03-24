import React from 'react';
import { StyledSupportButton } from './StyledStateButton';

export const StateButton = ({ variant, title, ...buttonProps }) => {
    return <StyledSupportButton {...buttonProps}>{title}</StyledSupportButton>;
};
