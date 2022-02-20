import React, { ChangeEventHandler, FC, HTMLInputTypeAttribute, HTMLProps, MutableRefObject, Ref } from 'react';
import { StyledFormInput } from './StyledFormInput';

interface FormInputProps {
    hasErrors?: boolean;
    value?: string;
    autoFocus?: boolean;
    onChange?: ChangeEventHandler<HTMLInputElement>;
    id?: string;
    name?: string;
    type?: HTMLInputTypeAttribute;
    placeholder?: string;
}

const FormInput: FC<FormInputProps> = ({ ...props }) => {
    return <StyledFormInput {...props} />;
};

export default FormInput;
