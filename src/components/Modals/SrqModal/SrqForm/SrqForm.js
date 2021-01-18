import React from "react";
import FormInput from "../../../FormInput/FormInput";
import { StyledFormTextarea } from "../../../FormTextarea/StyledFormTextarea";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import { StyledFormContainer } from "./StyledSrqForm";
const SrqForm = ({ onSubmit }) => {
  return (
    <StyledFormContainer onSubmit={onSubmit}>
      <FormInput required name="title" placeholder="Tytuł SRQ" />
      <FormInput required name="description" placeholder="Opis SRQ" />
      <FormInput
        required
        name="department"
        placeholder="Dział, do którego trafia SRQ"
      />
      <StyledFormTextarea required />
      <SubmitButton title="Dodaj SRQ" />
    </StyledFormContainer>
  );
};

export default SrqForm;
