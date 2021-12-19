import React from 'react';
import FormInput from '../FormInput/FormInput';

const SupportInput = ({ labelContent, name, ...props }) => (
    <>
        {labelContent && <label htmlFor={name}>{labelContent}</label>}
        <FormInput {...props} />
    </>
);

export default SupportInput;
