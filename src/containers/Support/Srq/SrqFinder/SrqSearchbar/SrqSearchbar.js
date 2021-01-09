import React from "react";
import { StyledInputWrapper, StyledSrqSearchbar } from "./StyledSrqSearchbar";

const SrqSearchbar = ({ onType, value }) => {
  return (
    <StyledInputWrapper>
      <StyledSrqSearchbar
        value={value}
        onChange={(event) => {
          onType(event);
        }}
        placeholder={"Wpisz wyszukiwaną frazę"}
      />
    </StyledInputWrapper>
  );
};

export default SrqSearchbar;
