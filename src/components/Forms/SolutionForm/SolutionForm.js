import { useFormik } from 'formik';
import React from 'react';
import useFormikError from '../../../hooks/useFormikError';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import { toastProvider } from '../../../libs/toast';
import urls from '../../../shared/urls';
import { solutionSchema } from '../../../shared/validation/validation';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import FormInput from '../../Inputs/FormInput/FormInput';
import { StyledFormTextarea } from '../../Inputs/FormTextarea/StyledFormTextarea';
import Spinner from '../../UI/Spinner/Spinner';
import { StyledFormContainer } from './StyledSolutionForm';

const SolutionForm = ({ refresh }) => {
    const { requestHandler, isLoading } = useRequest(urls.solution, REQUEST_METHODS.PUT);

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

                await requestHandler(formData, () => urls.solution);

                toastProvider.success('Rozwiązanie dodane pomyślnie');
                resetForm({});
                refresh?.();
            } catch (error) {
                toastProvider.error(error.message);
            }
        },
        validationSchema: solutionSchema,
        validateOnChange: false,
    });

    useFormikError(formik.errors);

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

            {isLoading ? <Spinner centered /> : <SubmitButton title="Dodaj zamknięcie" onClick={formik.handleSubmit} />}
        </StyledFormContainer>
    );
};

export default SolutionForm;
