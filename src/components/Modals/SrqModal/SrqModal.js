import React from "react";
import Modal from "../../UI/Modal/Modal";
import { SrqModalContainer } from "./StyledSrqModal";

const SrqModal = ({ isOpened, closeModalHandler }) => {
  return (
    <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
      <SrqModalContainer></SrqModalContainer>
    </Modal>
  );
};

export default SrqModal;
