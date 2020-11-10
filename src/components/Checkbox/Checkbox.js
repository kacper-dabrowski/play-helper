import React from "react";
import { StyledCheckbox } from "./StyledCheckbox";

const Checkbox = ({ labelContent, setHandler, value }, ...props) => (
  <>
    {labelContent && <label>{labelContent}</label>}
    <StyledCheckbox
      type={"checkbox"}
      {...props}
      onChange={(event) => setHandler(event.target.checked)}
      checked={value}
    />
  </>
);

export default Checkbox;
