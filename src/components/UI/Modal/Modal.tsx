import React, { FC } from 'react';
import ReactDOM from 'react-dom';
import { AnimatePresence, motion } from 'framer-motion';
import Backdrop from '../Backdrop/Backdrop';
import cancelIcon from '../../../assets/icons/cancel.svg';
import { ModalContainer, ModalWrapper } from './StyledModal';
import IconButton from '../../Buttons/IconButton/IconButton';
import { fadeInOut } from '../../../shared/animations/animations';

interface ModalProps {
    isOpened: boolean;
    closeModalHandler: () => void;
}

const modalPortalElement = document.getElementById('modal-portal') as HTMLInputElement;

const Modal: FC<ModalProps> = ({ children, isOpened, closeModalHandler }) =>
    ReactDOM.createPortal(
        <AnimatePresence>
            {isOpened && (
                <>
                    <Backdrop isOpened={isOpened} closeHandler={closeModalHandler} />
                    <ModalWrapper as={motion.div} {...fadeInOut()}>
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
        modalPortalElement
    );

export default Modal;
