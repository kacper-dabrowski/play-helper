import React from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import cancelIcon from '../../../assets/icons/cancel.svg';
import { ModalContainer, ModalWrapper } from './StyledModal';
import IconButton from '../../Buttons/IconButton/IconButton';

const Modal = ({ children, isOpened, closeModalHandler }) => {
    return ReactDOM.createPortal(
        <AnimatePresence>
            {isOpened && (
                <>
                    <Backdrop isOpened={isOpened} closeModalHandler={closeModalHandler} />
                    <ModalWrapper as={motion.div} animate={{ opacity: 1 }} exit={{ opacity: 0 }}>
                        <ModalContainer>
                            <IconButton
                                src={cancelIcon}
                                onClick={closeModalHandler}
                                width="1.5rem"
                                height="1.5rem"
                                top="1rem"
                                right="1rem"
                            />
                            {children}
                        </ModalContainer>
                    </ModalWrapper>
                </>
            )}
        </AnimatePresence>,

        document.getElementById('modal-portal')
    );
};

export default Modal;
