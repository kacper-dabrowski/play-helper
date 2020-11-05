import React from "react";
import { StyledIcon } from "./StyledIconButton";

const IconButton = (props) => (
  <StyledIcon
    width={props.width}
    height={props.height}
    src={props.src}
    alt={props.alt}
  />
);

export default IconButton;
