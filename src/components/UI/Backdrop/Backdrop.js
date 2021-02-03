import React from 'react';
import { StyledBackdrop } from './StyledBackdrop';

const Backdrop = ({ isOpened, children, closeModalHandler }) => {
    if (!isOpened) {
        return null;
    }

    return <StyledBackdrop onClick={closeModalHandler}>{children}</StyledBackdrop>;
};

export default Backdrop;
