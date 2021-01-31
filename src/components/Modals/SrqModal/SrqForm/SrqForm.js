import axios from "axios";
import { useFormik } from "formik";
import React, { useState } from "react";
import urls from "../../../../shared/urls";
import FormInput from "../../../FormInput/FormInput";
import { StyledFormTextarea } from "../../../FormTextarea/StyledFormTextarea";
import Spinner from "../../../Spinner/Spinner";
import SubmitButton from "../../../SubmitButton/SubmitButton";
import { StyledFormContainer } from "./StyledSrqForm";
import * as Yup from "yup";

const validationSchema = Yup.object({
  title: Yup.string().required(),
  description: Yup.string().required(),
  department: Yup.string().required(),
  content: Yup.string().required(),
});

const SrqForm = ({ setError, setSuccess }) => {
  const [loading, setLoading] = useState(false);

  const onSubmit = async (values, resetForm) => {
    try {
      setSuccess(null);
      setError(null);
      const { title, description, department, content } = values;
      setLoading(true);
      const formData = {
        title,
        description,
        department,
        content,
      };

      await axios.post(urls.srq, formData);
      setLoading(false);
      setSuccess(true);
      resetForm();
    } catch (error) {
      setLoading(false);
      setError(error.message);
    }
  };

  const formik = useFormik({
    initialValues: {
      title: "",
      description: "",
      department: "",
      content: "",
    },
    validationSchema,
    validateOnChange: true,
    onSubmit: (values, { resetForm }) => onSubmit(values, resetForm),
  });

  return (
    <StyledFormContainer onSubmit={formik.handleSubmit}>
      <FormInput
        hasErrors={!!formik.errors.title || formik.touched.title}
        value={formik.values.title}
        onChange={formik.handleChange}
        name="title"
        placeholder="Tytuł SRQ"
      />
      <FormInput
        hasErrors={!!formik.errors.description || formik.touched.description}
        value={formik.values.description}
        onChange={formik.handleChange}
        name="description"
        placeholder="Opis SRQ"
      />
      <FormInput
        hasErrors={!!formik.errors.department || formik.touched.department}
        value={formik.values.department}
        onChange={formik.handleChange}
        name="department"
        placeholder="Dział, do którego trafia SRQ"
      />
      <StyledFormTextarea
        hasErrors={!!formik.errors.content || formik.touched.content}
        value={formik.values.content}
        onChange={formik.handleChange}
        name="content"
        placeholder="Treść formatki"
      />
      {loading ? <Spinner centered /> : <SubmitButton title="Dodaj SRQ" />}
    </StyledFormContainer>
  );
};

export default SrqForm;
