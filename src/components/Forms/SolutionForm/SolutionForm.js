import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import FormInput from '../../FormInput/FormInput';
import axios from '../../../axios';
import { StyledFormTextarea } from '../../FormTextarea/StyledFormTextarea';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { StyledFormContainer } from './StyledSolutionForm';
import urls from '../../../shared/urls';
import Spinner from '../../Spinner/Spinner';
import ErrorBadge from '../../UI/ErrorBadge/ErrorBadge';
import { getLastMessageFromFormikErrors } from '../../../shared/errors/handleErrors';

const validationSchema = Yup.object({
    title: Yup.string().required('Pole jest wymagane'),
    description: Yup.string().required('Pole jest wymagane'),
    content: Yup.string().required('Pole jest wymagane'),
    isPublic: Yup.boolean(),
});

const submitHandler = async (values, resetForm, setLoading, setHasError) => {
    try {
        const { title, description, content, isPublic } = values;
        const formData = {
            title,
            description,
            content,
            isPublic,
        };

        setLoading(true);
        await axios.put(urls.solution, formData);
        setLoading(false);
        setHasError('');
        resetForm({});
    } catch (error) {
        setHasError(error.message);
        setLoading(false);
    }
};

const SolutionForm = ({ refresh }) => {
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState('');
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            content: '',
            isPublic: false,
        },
        onSubmit: async (values, { resetForm }) => {
            submitHandler(values, resetForm, setLoading, setHasError);
            refresh();
        },
        validationSchema,
        validateOnChange: false,
    });

    return (
        <StyledFormContainer onSubmit={formik.handleSubmit}>
            <ErrorBadge message={getLastMessageFromFormikErrors(formik.errors) || hasError} />
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
