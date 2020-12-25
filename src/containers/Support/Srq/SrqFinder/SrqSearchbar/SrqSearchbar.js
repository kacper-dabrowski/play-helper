import React from "react";
import { StyledInputWrapper, StyledSrqSearchbar } from "./StyledSrqSearchbar";

const SrqSearchbar = () => {
  return (
    <StyledInputWrapper>
      <StyledSrqSearchbar placeholder={"Wpisz wyszukiwaną frazę"} />
    </StyledInputWrapper>
  );
};

export default SrqSearchbar;
