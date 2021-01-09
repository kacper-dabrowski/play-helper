import React from "react";
import { StyledArrowBack } from "./StyledArrowBack";

const ArrowBack = ({ type }) => {
  return <StyledArrowBack to={"/"} type={type} />;
};

export default ArrowBack;
