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
    man: Yup.string().required('Pole jest wymagane'),
    woman: Yup.string().required('Pole jest wymagane'),
    company: Yup.string().required('Pole jest wymagane'),
});

const submitHandler = async (values, resetForm, setLoading, setHasError) => {
    try {
        const { title, description, man, woman, company } = values;
        const formData = {
            title,
            description,
            man,
            woman,
            company,
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

const SolutionForm = () => {
    const [loading, setLoading] = useState(false);
    const [hasError, setHasError] = useState('');
    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            man: '',
            woman: '',
            company: '',
        },
        onSubmit: async (values, { resetForm }) => submitHandler(values, resetForm, setLoading, setHasError),
        validationSchema,
    });
    return (
        <StyledFormContainer onSubmit={formik.handleSubmit}>
            <ErrorBadge message={getLastMessageFromFormikErrors(formik.errors) || hasError} />
            <FormInput
                name="title"
                hasErrors={!!formik.errors.title || formik.touched.title}
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Tytuł zamknięcia"
            />
            <FormInput
                hasErrors={!!formik.errors.description || formik.touched.description}
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Opis zamknięcia"
            />
            <StyledFormTextarea
                name="man"
                hasErrors={!!formik.errors.man || formik.touched.man}
                onChange={formik.handleChange}
                value={formik.values.man}
                placeholder="Wersja dla Pana"
            />
            <StyledFormTextarea
                name="woman"
                hasErrors={!!formik.errors.woman || formik.touched.woman}
                onChange={formik.handleChange}
                value={formik.values.woman}
                placeholder="Wersja dla Pani"
            />
            <StyledFormTextarea
                name="company"
                hasErrors={!!formik.errors.company || formik.touched.company}
                onChange={formik.handleChange}
                value={formik.values.company}
                placeholder="Wersja dla spółki"
            />

            {loading ? <Spinner centered /> : <SubmitButton title="Dodaj zamknięcie" onClick={formik.handleSubmit} />}
        </StyledFormContainer>
    );
};

export default SolutionForm;
