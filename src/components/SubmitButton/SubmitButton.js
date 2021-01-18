import React from "react";
import { StyledSubmitButton } from "./StyledSubmitButton";

const SubmitButton = ({ onClick, title }) => {
  return (
    <StyledSubmitButton onClick={onClick} type={"submit"}>
      {title}
    </StyledSubmitButton>
  );
};

export default SubmitButton;
