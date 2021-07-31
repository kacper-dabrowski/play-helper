import React from 'react';
import FormInput from '../FormInput/FormInput';

const SupportInput = (props) => (
    <>
        {props.labelContent && <label htmlFor={props.name}>{props.labelContent}</label>}
        <FormInput {...props} />
    </>
);

export default SupportInput;
