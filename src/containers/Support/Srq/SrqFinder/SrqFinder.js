import React from "react";
import SrqResults from "./SrqResults/SrqResults";
import SrqSearchbar from "./SrqSearchbar/SrqSearchbar";
import { StyledSrqFinder } from "./StyledSrqFinder";

const SrqFinder = () => {
  return (
    <StyledSrqFinder>
      <SrqResults />
      <SrqSearchbar />
    </StyledSrqFinder>
  );
};

export default SrqFinder;
