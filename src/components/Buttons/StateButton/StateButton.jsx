import React from 'react';
import { Project } from '../../../shared/identifiers';
import { StyledPlayNextButton, StyledSupportButton } from './StyledStateButton';

export const StateButton = ({ variant, title, ...buttonProps }) => {
    if (variant === Project.Next) {
        return <StyledPlayNextButton {...buttonProps}>{title}</StyledPlayNextButton>;
    }

    if (variant === Project.Support) {
        return <StyledSupportButton {...buttonProps}>{title}</StyledSupportButton>;
    }

    return null;
};
