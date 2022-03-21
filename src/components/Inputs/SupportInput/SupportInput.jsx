import { FormControl, FormLabel, InputGroup } from '@chakra-ui/react';
import React from 'react';
import FormInput from '../FormInput/FormInput';

const SupportInput = (props) => (
    <FormControl>
        {props.labelContent && <FormLabel htmlFor={props.name}>{props.labelContent}</FormLabel>}
        <FormInput {...props} />
    </FormControl>
);

export default SupportInput;
