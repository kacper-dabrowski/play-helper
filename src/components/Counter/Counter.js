import React from "react";
import { StyledCounter } from "./StyledCounter";

const Counter = (props) => {
  const { minValue, maxValue, value } = props;
  return (
    <StyledCounter
      onClick={() => props.onChangeValue(value, minValue, maxValue)}
    >
      {value}
    </StyledCounter>
  );
};

export default Counter;
