import React from 'react';

const SupportInput = (props) => (
    <>
        {props.labelContent && <label htmlFor={props.name}>{props.labelContent}</label>}
        <FormInput {...props} />
    </>
);

export default SupportInput;
