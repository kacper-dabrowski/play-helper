import React from 'react';
import useFocus from '../../../hooks/useFocus';
import { StyledInputWrapper, StyledSrqSearchbar } from './StyledSrqSearchbar';

const SrqSearchbar = ({ onType, value }) => {
    const focusRef = useFocus();
    return (
        <StyledInputWrapper>
            <StyledSrqSearchbar
                ref={focusRef}
                value={value}
                onChange={(event) => {
                    onType(event);
                }}
                placeholder="Wpisz wyszukiwaną frazę"
            />
        </StyledInputWrapper>
    );
};

export default SrqSearchbar;
