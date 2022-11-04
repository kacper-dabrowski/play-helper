import classNames from 'classnames';
import { FC, HTMLProps } from 'react';
import { ErrorMessage } from '../errorMessage/errorMessage';
import { InputLabel } from '../inputLabel/inputLabel';
import styles from './input.module.scss';

export interface InputProps extends HTMLProps<HTMLInputElement> {
    additionalClasses?: string;
    labelText?: string;
    error?: string;
}

export const Input: FC<InputProps> = ({ children, additionalClasses, labelText, error, ...props }) => {
    const classes = classNames(styles.input, additionalClasses);

    return (
        <div>
            <InputLabel>{labelText}</InputLabel>
            <input {...props} className={classes}>
                {children}
            </input>
            <ErrorMessage>{error}</ErrorMessage>
        </div>
    );
};

export interface CheckboxProps extends HTMLProps<HTMLInputElement> {
    additionalClasses?: string;
}

export const Checkbox: FC<CheckboxProps> = ({ additionalClasses, ...props }) => {
    const classes = classNames(styles.checkbox, additionalClasses);

    return <input type={'checkbox'} className={classes} {...props} />;
};
