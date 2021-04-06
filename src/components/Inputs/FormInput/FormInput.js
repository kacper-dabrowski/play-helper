import React from 'react';
import { StyledFormInput } from './StyledFormInput';

const FormInput = ({ focusRef, ...props }) => {
    return <StyledFormInput ref={focusRef} {...props} />;
};

export default FormInput;
