import React from 'react';
import { StyledFormInput } from './StyledFormInput';

const FormInput = ({ focusRef, ...props }) => <StyledFormInput ref={focusRef} {...props} />;

export default FormInput;
