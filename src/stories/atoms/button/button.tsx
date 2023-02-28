import classnames from 'classnames';
import { FC, HTMLProps } from 'react';
import styles from './button.module.scss';

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    additionalClasses?: string;
    variant: ButtonVariant;
    loading?: boolean;
}

export const Button: FC<ButtonProps> = ({ children, additionalClasses, variant, loading }) => {
    const classes = classnames(styles.button, additionalClasses, styles[variant]);

    const content = loading ? 'ładowanie...' : children;

    return (
        <button className={classes} disabled={loading} tabIndex={1}>
            {content}
        </button>
    );
};

export enum ButtonVariant {
    Allowed = 'allowed',
    Forbidden = 'forbidden',
    Submit = 'submit',
}
