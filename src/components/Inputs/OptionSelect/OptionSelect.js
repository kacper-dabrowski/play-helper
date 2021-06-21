import React from 'react';
import * as Styled from './StyledOptionSelect';

export const OptionSelect = ({ children, selectProps }) => {
    return <Styled.Select {...selectProps}>{children}</Styled.Select>;
};
