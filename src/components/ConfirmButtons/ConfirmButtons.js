import React from "react";
import ClearButton from "./ClearButton/ClearButton";
import ConfirmButton from "./ConfirmButton/ConfirmButton";
import { ConfirmButtonsWrapper } from "./StyledConfirmButtons";

const ConfirmButtons = ({
  onGenerateTemplate,
  onClearFields,
  confirmTitle,
}) => (
  <ConfirmButtonsWrapper>
    <ConfirmButton onClick={onGenerateTemplate} title={confirmTitle} />
    <ClearButton onClick={onClearFields} />
  </ConfirmButtonsWrapper>
);
export default ConfirmButtons;
