import React from 'react';
import {StyledPlayNextButton, StyledSupportButton} from './StyledStateButton';
import config from '../../../shared/identifiers';

export const StateButton = ({variant, title, ...buttonProps}) => {
    if (variant === config.projects.NEXT) {
        return <StyledPlayNextButton {...buttonProps}>{title}</StyledPlayNextButton>;
    }

    if (variant === config.projects.SUPPORT) {
        return <StyledSupportButton {...buttonProps}>{title}</StyledSupportButton>;
    }

    return null;
};
