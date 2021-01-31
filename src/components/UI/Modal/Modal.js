import React from "react";
import ReactDOM from "react-dom";
import Backdrop from "../Backdrop/Backdrop";
import { CancelModal } from "./CancelModal/StyledCancelModal";

import { ModalContainer, ModalWrapper } from "./StyledModal";

const Modal = ({ children, isOpened, closeModalHandler }) => {
  return ReactDOM.createPortal(
    <Backdrop isOpened={isOpened} closeModalHandler={closeModalHandler}>
      <ModalWrapper>
        <ModalContainer>
          <CancelModal onClick={closeModalHandler} />
          {children}
        </ModalContainer>
      </ModalWrapper>
    </Backdrop>,
    document.getElementById("modal-portal")
  );
};

export default Modal;
