import React from 'react';
import { StyledBackdrop } from './StyledBackdrop';

const Backdrop = ({ isOpened, closeModalHandler }) => {
    if (!isOpened) {
        return null;
    }

    return <StyledBackdrop onClick={closeModalHandler} />;
};

export default Backdrop;
