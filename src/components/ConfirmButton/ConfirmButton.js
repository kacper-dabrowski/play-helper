import React from "react";
import { StyledConfirmButton } from "./StyledConfirmButton";

const ConfirmButton = (props) => (
  <StyledConfirmButton {...props}>
    {props.title ? props.title : "Zatwierdź"}
  </StyledConfirmButton>
);

export default ConfirmButton;
