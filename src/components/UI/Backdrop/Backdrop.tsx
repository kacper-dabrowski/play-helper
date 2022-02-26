import React, { FC } from 'react';
import { StyledBackdrop } from './StyledBackdrop';

interface BackdropProps {
    isOpened: boolean;
    closeHandler?: () => void;
}

const Backdrop: FC<BackdropProps> = ({ isOpened, closeHandler }) => {
    if (!isOpened) {
        return null;
    }

    return <StyledBackdrop onClick={closeHandler} />;
};

export default Backdrop;
