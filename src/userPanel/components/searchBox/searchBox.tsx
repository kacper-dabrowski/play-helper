import { SearchIcon } from '@chakra-ui/icons';
import { Box, Input, InputGroup, InputLeftElement } from '@chakra-ui/react';
import React, { FC } from 'react';

interface SearchBoxProps {
    setValue: (value: string) => void;
    value: string;
}

export const SearchBox: FC<SearchBoxProps> = ({ setValue, value }) => {
    return (
        <Box>
            <InputGroup>
                <InputLeftElement pointerEvents="none" children={<SearchIcon />} />
                <Input
                    autoFocus
                    value={value}
                    onChange={(event) => {
                        setValue(event.target.value);
                    }}
                    type="search"
                    placeholder="Wpisz wyszukiwaną frazę"
                />
            </InputGroup>
        </Box>
    );
};
