import React from "react";
import { StyledButton } from "./StyledButton";

const Button = (props) => <StyledButton {...props}>{props.title}</StyledButton>;

export default Button;
