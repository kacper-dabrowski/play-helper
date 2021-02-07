import axios from 'axios';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import * as Yup from 'yup';
import urls from '../../../shared/urls';
import FormInput from '../../FormInput/FormInput';
import { StyledFormTextarea } from '../../FormTextarea/StyledFormTextarea';
import Spinner from '../../Spinner/Spinner';
import SubmitButton from '../../SubmitButton/SubmitButton';
import { StyledFormContainer } from './StyledSrqForm';
import ErrorBadge from '../../UI/ErrorBadge/ErrorBadge';
import { getLastMessageFromFormikErrors } from '../../../shared/errors/handleErrors';
import useFocus from '../../../hooks/useFocus';

const validationSchema = Yup.object({
    title: Yup.string().required('Pole jest wymagane'),
    description: Yup.string().required('Pole jest wymagane'),
    department: Yup.string().required('Pole jest wymagane'),
    content: Yup.string().required('Pole jest wymagane'),
});

const SrqForm = ({ setError, setSuccess }) => {
    const [loading, setLoading] = useState(false);
    const focusRef = useFocus();

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
            title: '',
            description: '',
            department: '',
            content: '',
        },
        validationSchema,
        validateOnChange: true,
        onSubmit: (values, { resetForm }) => onSubmit(values, resetForm),
    });

    return (
        <StyledFormContainer onSubmit={formik.handleSubmit}>
            <ErrorBadge message={getLastMessageFromFormikErrors(formik.errors)} />
            <FormInput
                focusRef={focusRef}
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
