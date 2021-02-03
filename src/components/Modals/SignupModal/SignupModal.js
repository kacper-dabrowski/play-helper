import React from 'react';
import Modal from '../../UI/Modal/Modal';
import SignupForm from './SignupForm/SignupForm';
import { SignupModalContainer } from './SignupModalContainer';

const SignUpModal = ({ isOpened, closeModalHandler }) => {
    return (
        <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
            <SignupModalContainer>
                <SignupForm closeModalHandler={closeModalHandler} />
            </SignupModalContainer>
        </Modal>
    );
};

export default SignUpModal;
