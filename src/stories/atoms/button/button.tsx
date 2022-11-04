import classnames from 'classnames';
import { FC, HTMLProps } from 'react';
import styles from './button.module.scss';

export interface ButtonProps extends HTMLProps<HTMLButtonElement> {
    additionalClasses?: string;
    variant: ButtonVariant;
}

export const Button: FC<ButtonProps> = ({ children, additionalClasses, variant }) => {
    const classes = classnames(styles.button, additionalClasses, styles[variant]);

    return <button className={classes}>{children}</button>;
};

type ButtonVariant = 'allowed' | 'forbidden';
