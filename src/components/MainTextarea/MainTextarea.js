import React from "react";
import ClearButton from "../ClearButton/ClearButton";
import ConfirmButton from "../ConfirmButton/ConfirmButton";
import {
  MainTextareaWrapper,
  StyledMainTextarea,
  TextAreaButtonsWrapper,
} from "./StyledMainTextarea";

const MainTextarea = ({ setTemplate, ...props }) => (
  <MainTextareaWrapper>
    <StyledMainTextarea
      {...props}
      onChange={(event) => setTemplate(event.target.value)}
    />
    <TextAreaButtonsWrapper>
      <ConfirmButton />
      <ClearButton />
    </TextAreaButtonsWrapper>
  </MainTextareaWrapper>
);

export default MainTextarea;
