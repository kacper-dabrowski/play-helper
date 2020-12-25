import React from "react";
import Modal from "../../UI/Modal/Modal";
import LoginForm from "./LoginForm/LoginForm";
import { LoginModalContainer } from "./StyledLoginModal";

const LoginModal = ({ isOpened, closeModalHandler }) => {
  return (
    <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
      <LoginModalContainer>
        <LoginForm />
      </LoginModalContainer>
    </Modal>
  );
};

export default LoginModal;
