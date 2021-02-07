import React from 'react';
import { StyledLoginInput } from './StyledLoginInput';

const LoginInput = ({ focusRef, ...props }) => {
    return <StyledLoginInput ref={focusRef} {...props} />;
};

export default LoginInput;
