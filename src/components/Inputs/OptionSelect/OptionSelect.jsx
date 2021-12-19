import React from 'react';
import * as Styled from './StyledOptionSelect';

export const OptionSelect = ({ children, selectProps }) => <Styled.Select {...selectProps}>{children}</Styled.Select>;
