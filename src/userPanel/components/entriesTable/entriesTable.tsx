import { FC } from 'react';
import * as Styles from './styledEntriesTable';

export const EntriesTable: FC = ({ children }) => {
    return <Styles.container>{children}</Styles.container>;
};
