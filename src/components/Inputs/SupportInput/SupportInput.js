import React from 'react';
import { StyledSupportInput } from './StyledSupportInput';

const SupportInput = (props) => (
    <>
        {props.labelContent && <label htmlFor={props.name}>{props.labelContent}</label>}
        <StyledSupportInput {...props} />
    </>
);

export default SupportInput;
