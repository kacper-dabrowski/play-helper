import React from 'react';
import useFocus from '../../hooks/useFocus';
import { StyledSearchbar, StyledInputWrapper } from './StyledSearchBar';

const Searchbar = ({ onType, value }) => {
    const focusRef = useFocus();
    return (
        <StyledInputWrapper>
            <StyledSearchbar
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

export default Searchbar;
