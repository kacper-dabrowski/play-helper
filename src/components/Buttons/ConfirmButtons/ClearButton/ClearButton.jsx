import { Button } from '@chakra-ui/react';
import React from 'react';

const ClearButton = (props) => (
    <Button colorScheme={'red'} {...props}>
        Wyczyść
    </Button>
);

export default ClearButton;
