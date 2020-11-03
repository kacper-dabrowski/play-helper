import React from "react";
import { StyledCheckbox } from "./StyledCheckbox";

const Checkbox = (props) => (
  <>
    {props.labelContent && <label>{props.labelContent}</label>}
    <StyledCheckbox type={"checkbox"} {...props} />
  </>
);

export default Checkbox;
