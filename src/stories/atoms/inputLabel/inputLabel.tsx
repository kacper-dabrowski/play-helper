import classNames from 'classnames';
import { FC, HTMLProps } from 'react';
import styles from './inputLabel.module.scss';

interface InputLabelProps extends HTMLProps<HTMLLabelElement> {
    additionalClasses?: string;
}

export const InputLabel: FC<InputLabelProps> = ({ children, additionalClasses, ...props }) => {
    const classes = classNames(styles.label, additionalClasses);

    return (
        <label {...props} className={classes}>
            {children}
        </label>
    );
};
