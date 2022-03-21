import { Button } from '@chakra-ui/react';
import React from 'react';

const ConfirmButton = (props) => (
    <Button colorScheme={'green'} {...props}>
        {props.title ? props.title : 'Zatwierdź'}
    </Button>
);

export default ConfirmButton;
