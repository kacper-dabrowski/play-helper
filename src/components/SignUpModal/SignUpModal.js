import React from "react";
import Modal from "../UI/Modal/Modal";
import SignUpForm from "./SignUpForm/SignUpForm";
import { SignupModalContainer } from "./SignupModalContainer";
const SignUpModal = ({ isOpened, closeModalHandler }) => {
  return (
    <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
      <SignupModalContainer>
        <SignUpForm />
      </SignupModalContainer>
    </Modal>
  );
};

export default SignUpModal;
