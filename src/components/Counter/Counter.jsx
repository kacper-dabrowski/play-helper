import { FormControl, FormLabel, IconButton, Text } from '@chakra-ui/react';
import React from 'react';
import { CounterWrapper } from './StyledCounter';

const Counter = ({ onChangeValue, minValue, maxValue, value }) => {
    return (
        <CounterWrapper>
            <FormControl>
                <FormLabel>Ilość rat</FormLabel>
                <IconButton
                    onClick={() => onChangeValue(value, minValue, maxValue)}
                    colorScheme="whiteAlpha"
                    aria-label="Search database"
                    icon={<Text>{value}</Text>}
                />
            </FormControl>
        </CounterWrapper>
    );
};

export default Counter;
