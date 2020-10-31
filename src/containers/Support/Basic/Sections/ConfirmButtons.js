import React from "react";
import ClearButton from "../../../../components/ClearButton/ClearButton";
import ConfirmButton from "../../../../components/ConfirmButton/ConfirmButton";
import { ConfirmButtonsWrapper } from "../StyledBasic";

const ConfirmButtons = () => (
  <ConfirmButtonsWrapper>
    <ConfirmButton />
    <ClearButton />
  </ConfirmButtonsWrapper>
);
export default ConfirmButtons;
