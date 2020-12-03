import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import { CancelModal } from "./CancelModal/StyledCancelModal";

import { ModalContainer, ModalWrapper } from "./StyledModal";

const Modal = ({ children, isOpened, closeModalHandler }) => {
  return (
    <Backdrop isOpened={isOpened} closeModalHandler={closeModalHandler}>
      <ModalWrapper>
        <ModalContainer>
          <CancelModal onClick={closeModalHandler} />
          {children}
        </ModalContainer>
      </ModalWrapper>
    </Backdrop>
  );
};

export default Modal;
