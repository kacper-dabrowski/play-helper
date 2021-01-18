import axios from "axios";
import React, { useState } from "react";
import urls from "../../../../shared/urls";
import FormInput from "../../../FormInput/FormInput";
import { StyledFormTextarea } from "../../../FormTextarea/StyledFormTextarea";
import Spinner from "../../../Spinner/Spinner";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import { StyledFormContainer } from "./StyledSrqForm";
const SrqForm = ({ setError, setSuccess }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [department, setDepartment] = useState("");
  const [content, setContent] = useState("");
  const [loading, setLoading] = useState(false);

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
      setSuccess(true);
      clearForm();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  return (
    <StyledFormContainer onSubmit={onSubmit}>
      <FormInput
        onChange={(event) => setTitle(event.target.value)}
        required
        name="title"
        placeholder="Tytuł SRQ"
      />
      <FormInput
        onChange={(event) => setDescription(event.target.value)}
        required
        name="description"
        placeholder="Opis SRQ"
      />
      <FormInput
        onChange={(event) => setDepartment(event.target.value)}
        required
        name="department"
        placeholder="Dział, do którego trafia SRQ"
      />
      <StyledFormTextarea
        onChange={(event) => setContent(event.target.value)}
        required
        name="content"
        placeholder="Treść formatki"
      />
      {loading ? <Spinner centered /> : <SubmitButton title="Dodaj SRQ" />}
    </StyledFormContainer>
  );
};

export default SrqForm;
