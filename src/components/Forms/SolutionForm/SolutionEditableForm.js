import cogoToast from 'cogo-toast';
import { useFormik } from 'formik';
import React from 'react';
import * as Yup from 'yup';
import useError from '../../../hooks/useError';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import FormInput from '../../Inputs/FormInput/FormInput';
import { StyledFormTextarea } from '../../Inputs/FormTextarea/StyledFormTextarea';
import Spinner from '../../UI/Spinner/Spinner';
import { StyledFormContainer } from './StyledSolutionForm';

const validationSchema = Yup.object({
    title: Yup.string().required('Pole jest wymagane'),
    description: Yup.string().required('Pole jest wymagane'),
    content: Yup.string().required('Pole jest wymagane'),
    isPublic: Yup.boolean(),
});

const SolutionEditableForm = ({ refresh, populatedFields, setEditMode }) => {
    const { isLoading, requestHandler, error } = useRequest(urls.solution, REQUEST_METHODS.POST);
    const { title, description, content, isPublic, id } = populatedFields;

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: {
            title,
            description,
            content,
            isPublic,
        },
        onSubmit: async (values, { resetForm }) => {
            try {
                const formData = {
                    title: values.title,
                    description: values.description,
                    content: values.content,
                    isPublic: values.isPublic,
                };

                await requestHandler(formData, () => `${urls.solution}/${id}`);

                if (error) {
                    throw error;
                }
                cogoToast.success('Pomyślnie zapisano zmiany');
                resetForm({});
                refresh?.();
                setEditMode(false);
            } catch (submitError) {
                cogoToast.error(error.message);
            }
        },
        validationSchema,
        validateOnChange: false,
    });

    useError(formik.errors);

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

            {isLoading ? <Spinner centered /> : <SubmitButton title="Zapisz zmiany" onClick={formik.handleSubmit} />}
        </StyledFormContainer>
    );
};

export default SolutionEditableForm;
