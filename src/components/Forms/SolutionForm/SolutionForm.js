import cogoToast from 'cogo-toast';
import { useFormik } from 'formik';
import React from 'react';
import useFormikError from '../../../hooks/useFormikError';
import { solutionSchema } from '../../../shared/validation/validation';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import FormInput from '../../Inputs/FormInput/FormInput';
import { StyledFormTextarea } from '../../Inputs/FormTextarea/StyledFormTextarea';
import Spinner from '../../UI/Spinner/Spinner';
import { StyledFormContainer } from './StyledSolutionForm';

const SolutionForm = ({ refresh, onAddSolution, addSolutionRequest }) => {
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

                await onAddSolution({ solution: formData });

                resetForm({});
                refresh?.();
            } catch (error) {
                cogoToast.error(error.message);
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

            {addSolutionRequest.loading ? (
                <Spinner centered />
            ) : (
                <SubmitButton title="Dodaj zamknięcie" onClick={formik.handleSubmit} />
            )}
        </StyledFormContainer>
    );
};

export default SolutionForm;
