import { FC } from 'react';
import styles from './errorMessage.module.scss';

export const ErrorMessage: FC = ({ children }) => {
    return <p className={styles.error}>{children}</p>;
};
