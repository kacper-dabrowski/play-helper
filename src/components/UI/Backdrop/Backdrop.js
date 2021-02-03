import React from 'react';
import { StyledBackdrop } from './StyledBackdrop';

const Backdrop = ({ isOpened, children }) => {
    if (!isOpened) {
        return null;
    }

    return <StyledBackdrop>{children}</StyledBackdrop>;
};

export default Backdrop;
