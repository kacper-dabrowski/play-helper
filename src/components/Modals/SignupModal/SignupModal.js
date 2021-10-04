import React from 'react';
import Modal from '../../UI/Modal/Modal';
import SignupForm from '../../Forms/SignupForm/SignupForm';
import { SignupModalContainer } from './SignupModalContainer';

const SignUpModal = ({ isOpened, closeModalHandler, onRegisterUser, requestStatus }) => {
    return (
        <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
            <SignupModalContainer>
                <SignupForm
                    closeModalHandler={closeModalHandler}
                    onRegisterUser={onRegisterUser}
                    requestStatus={requestStatus}
                />
            </SignupModalContainer>
        </Modal>
    );
};

export default SignUpModal;
