import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import useFeedbackSnackbars from '../../../hooks/useFeedbackSnackbars';
import useFormikErrors from '../../../hooks/useFormikErrors';
import axios from '../../../libs/axios';
import urls from '../../../shared/urls';
import FormInput from '../../FormInput/FormInput';
import { StyledFormTextarea } from '../../FormTextarea/StyledFormTextarea';
import Spinner from '../../Spinner/Spinner';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { StyledFormContainer } from './StyledSolutionForm';

const validationSchema = Yup.object({
    title: Yup.string().required('Pole jest wymagane'),
    description: Yup.string().required('Pole jest wymagane'),
    content: Yup.string().required('Pole jest wymagane'),
    isPublic: Yup.boolean(),
});

const SolutionForm = ({ refresh }) => {
    const [loading, setLoading] = useState(false);
    const [setSuccess, setError] = useFeedbackSnackbars();

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            content: '',
            isPublic: false,
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const { title, description, content, isPublic } = values;
                const formData = {
                    title,
                    description,
                    content,
                    isPublic,
                };
                setSuccess('');
                setLoading(true);
                await axios.put(urls.solution, formData);
                setLoading(false);
                setError('');
                setSuccess('Rozwiązanie dodane pomyślnie');
                resetForm({});
                refresh();
            } catch (error) {
                setError(error.message);
                setLoading(false);
            }
        },
        validationSchema,
        validateOnChange: false,
    });

    useFormikErrors(formik.errors);

    return (
        <StyledFormContainer onSubmit={formik.handleSubmit}>
            <FormInput
                name="title"
                hasErrors={!!formik.errors.title}
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Tytuł zamknięcia"
            />
            <FormInput
                hasErrors={!!formik.errors.description}
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Opis zamknięcia"
            />
            <StyledFormTextarea
                name="content"
                hasErrors={!!formik.errors.content}
                onChange={formik.handleChange}
                value={formik.values.content}
                placeholder="Treść zamknięcia"
            />
            <label htmlFor="isPublic">Widok publiczny: </label>
            <input type="checkbox" name="isPublic" onChange={formik.handleChange} value={formik.values.isPublic} />

            {loading ? <Spinner centered /> : <SubmitButton title="Dodaj zamknięcie" onClick={formik.handleSubmit} />}
        </StyledFormContainer>
    );
};

export default SolutionForm;
