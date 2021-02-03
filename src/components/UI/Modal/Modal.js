import React from 'react';
import ReactDOM from 'react-dom';
import { motion, AnimatePresence } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import { CancelModal } from './CancelModal/StyledCancelModal';

import { ModalContainer, ModalWrapper } from './StyledModal';

const Modal = ({ children, isOpened, closeModalHandler }) => {
    return ReactDOM.createPortal(
        <>
            <AnimatePresence>
                {isOpened && (
                    <Backdrop isOpened={isOpened} closeModalHandler={closeModalHandler}>
                        <ModalWrapper as={motion.div} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                            <ModalContainer>
                                <CancelModal onClick={closeModalHandler} />
                                {children}
                            </ModalContainer>
                        </ModalWrapper>
                    </Backdrop>
                )}
            </AnimatePresence>
        </>,
        document.getElementById('modal-portal')
    );
};

export default Modal;
