import React from "react";
import ConfirmButton from "../ConfirmButtons/ConfirmButton/ConfirmButton";
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
      <ConfirmButton title={"Kopiuj"} />
    </TextAreaButtonsWrapper>
  </MainTextareaWrapper>
);

export default MainTextarea;
