import React from "react";
import Backdrop from "../Backdrop/Backdrop";
import { CancelModal } from "./CancelModal/StyledCancelModal";

import { ModalContainer, ModalWrapper } from "./StyledModal";

const Modal = ({ children, isOpened }) => {
  return (
    <Backdrop isOpened={isOpened}>
      <ModalWrapper>
        <ModalContainer>
          <CancelModal />
          {children}
        </ModalContainer>
      </ModalWrapper>
    </Backdrop>
  );
};

export default Modal;
