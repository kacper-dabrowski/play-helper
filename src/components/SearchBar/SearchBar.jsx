import React from 'react';
import { StyledInputWrapper, StyledSearchbar } from './StyledSearchBar';

const Searchbar = ({ onType, value }) => {
    return (
        <StyledInputWrapper>
            <StyledSearchbar
                autoFocus
                value={value}
                onChange={(event) => {
                    onType(event.target.value);
                }}
                placeholder="Wpisz wyszukiwaną frazę"
            />
        </StyledInputWrapper>
    );
};

export default Searchbar;
