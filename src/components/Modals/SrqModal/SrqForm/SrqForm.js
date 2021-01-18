import axios from "axios";
import React, { useState } from "react";
import urls from "../../../../shared/urls";
import FormInput from "../../../FormInput/FormInput";
import { StyledFormTextarea } from "../../../FormTextarea/StyledFormTextarea";
import Spinner from "../../../Spinner/Spinner";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import ErrorMessage from "../../ErrorMessage/ErrorMessage";
import { StyledFormContainer } from "./StyledSrqForm";
const SrqForm = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const clearForm = () => {
    setTitle("");
    setDescription("");
    setDepartment("");
    setContent("");
    setLoading("");
    setError("");
  };

  const onSubmit = async (event) => {
    try {
      setLoading(true);
      event.preventDefault();
      const formData = {
        title,
        description,
        department,
        content,
      };

      await axios.post(urls.srq, formData);
      setLoading(false);
      clearForm();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <StyledFormContainer onSubmit={onSubmit}>
      {error ? <ErrorMessage errorMessage={error} /> : null}
      <FormInput required name="title" placeholder="Tytuł SRQ" />
      <FormInput required name="description" placeholder="Opis SRQ" />
      <FormInput
        required
        name="department"
        placeholder="Dział, do którego trafia SRQ"
      />
      <StyledFormTextarea required name="content" />
      {loading ? <Spinner centered /> : <SubmitButton title="Dodaj SRQ" />}
    </StyledFormContainer>
  );
};

export default SrqForm;
