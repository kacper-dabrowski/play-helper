import React from 'react';
import { StyledInput } from './StyledInput';

const Input = (props) => (
    <>
        {props.labelContent && <label htmlFor={props.name}>{props.labelContent}</label>}
        <StyledInput {...props} />
    </>
);

export default Input;
