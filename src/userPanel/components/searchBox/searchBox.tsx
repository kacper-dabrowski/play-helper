import React, { FC } from 'react';
import * as Styles from './styledSearchBox';

interface SearchBoxProps {
    setValue: (value: string) => void;
    value: string;
}

export const SearchBox: FC<SearchBoxProps> = ({ setValue, value }) => {
    return (
        <Styles.inputWrapper>
            <Styles.searchBar
                autoFocus
                value={value}
                onChange={(event) => {
                    setValue(event.target.value);
                }}
                type="search"
                placeholder="Wpisz wyszukiwaną frazę"
            />
        </Styles.inputWrapper>
    );
};
