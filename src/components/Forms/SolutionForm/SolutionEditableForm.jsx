import { useFormik } from 'formik';
import React from 'react';
import { useFormikError } from '../../../hooks/useFormikError';
import { useNotifications } from '../../../hooks/useNotification';
import { solutionSchema } from '../../../shared/validation/validation';
import { SubmitButton } from '../../Buttons/SubmitButton/SubmitButton';
import FormInput from '../../Inputs/FormInput/FormInput';
import { StyledFormTextarea } from '../../Inputs/FormTextarea/StyledFormTextarea';
import { Spinner } from '../../UI/spinner/spinner';
import { StyledFormContainer } from './StyledSolutionForm';

const SolutionEditableForm = ({ refresh, populatedFields, setEditMode, onSolutionUpdate, solutionUpdateRequest }) => {
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
            const formData = {
                title: values.title,
                description: values.description,
                content: values.content,
                isPublic: values.isPublic,
            };

            await onSolutionUpdate({ updatedSolution: formData, id });

            resetForm({});
            refresh?.();
            setEditMode(false);
        },
        validationSchema: solutionSchema,
        validateOnChange: false,
    });

    useFormikError(formik.errors);

    useNotifications(solutionUpdateRequest, 'Pomyślnie zapisano zmiany');

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

            {solutionUpdateRequest.loading ? (
                <Spinner centered />
            ) : (
                <SubmitButton title="Zapisz zmiany" onClick={formik.handleSubmit} />
            )}
        </StyledFormContainer>
    );
};

export default SolutionEditableForm;
