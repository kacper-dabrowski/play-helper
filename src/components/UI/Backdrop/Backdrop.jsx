import React from 'react';
import { StyledBackdrop } from './StyledBackdrop';

const Backdrop = ({ isOpened, closeHandler }) => {
    if (!isOpened) {
        return null;
    }

    return <StyledBackdrop onClick={closeHandler} />;
};

export default Backdrop;
