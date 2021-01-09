import React from "react";
import { StyledSrqResultContainer } from "./StyledSrqResult";

const SrqResult = ({ title, description, department, onClick }) => {
  return (
    <StyledSrqResultContainer onClick={onClick}>
      <h3>{title}</h3>
      <p>{description}</p>
      <p>{department}</p>
    </StyledSrqResultContainer>
  );
};

export default SrqResult;
