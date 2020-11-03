import React from "react";
import ClearButton from "../ClearButton/ClearButton";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import {
  MainTextareaWrapper,
  StyledMainTextarea,
  TextAreaButtonsWrapper,
} from "./StyledMainTextarea";

const MainTextarea = (props) => (
  <MainTextareaWrapper>
    <StyledMainTextarea {...props} />
    <TextAreaButtonsWrapper>
      <ConfirmButton />
      <ClearButton />
    </TextAreaButtonsWrapper>
  </MainTextareaWrapper>
);

export default MainTextarea;
