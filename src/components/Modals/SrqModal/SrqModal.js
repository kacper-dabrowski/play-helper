import React from "react";
import { StyledFormHeader } from "../../UI/Headers/StyledHeaders";
import Modal from "../../UI/Modal/Modal";
import SrqForm from "./SrqForm/SrqForm";
import { SrqModalContainer } from "./StyledSrqModal";

const SrqModal = ({ isOpened, closeModalHandler }) => {
  return (
    <Modal isOpened={isOpened} closeModalHandler={closeModalHandler}>
      <SrqModalContainer>
        <StyledFormHeader>Utwórz SRQ</StyledFormHeader>
        <SrqForm />
      </SrqModalContainer>
    </Modal>
  );
};

export default SrqModal;
