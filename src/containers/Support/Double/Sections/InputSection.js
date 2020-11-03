import React from "react";
import Input from "../../../../components/Input/Input";
import { StyledInputSection } from "../StyledDouble";

const InputSection = ({ type }) => {
  if (type === "closed") {
    return (
      <StyledInputSection>
        <Input labelContent={"Number zgłoszenia bieżącego"} />
        <Input labelContent={"Numer zgłoszenia zamkniętego"} />
      </StyledInputSection>
    );
  } else if (type === "opened") {
    return (
      <StyledInputSection>
        <Input labelContent={"Number zgłoszenia bieżącego"} />
        <Input labelContent={"Numer zgłoszenia otwartego"} />
      </StyledInputSection>
    );
  }
};

export default InputSection;
