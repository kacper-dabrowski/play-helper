import classNames from 'classnames';
import { FC, HTMLProps } from 'react';
import { ErrorMessage } from '../errorMessage/errorMessage';
import { InputLabel } from '../inputLabel/inputLabel';
import styles from './textarea.module.scss';

export interface TextAreaProps extends HTMLProps<HTMLTextAreaElement> {
    additionalClasses?: string;
    labelText: string;
    error?: string;
}

export const TextArea: FC<TextAreaProps> = ({ children, additionalClasses, labelText, error, ...props }) => {
    const classes = classNames(styles.textarea, additionalClasses);

    return (
        <div>
            <InputLabel>{labelText}</InputLabel>
            <textarea {...props} className={classes}>
                {children}
            </textarea>
            <ErrorMessage>{error}</ErrorMessage>
        </div>
    );
};
