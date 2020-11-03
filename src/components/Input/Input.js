import React from "react";
import { StyledInput } from "./StyledInput";

const Input = (props) => (
  <>
    {props.labelContent && <label>{props.labelContent}</label>}
    <StyledInput {...props} />
  </>
);

export default Input;
