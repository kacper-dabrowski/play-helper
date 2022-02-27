import { useFormik } from 'formik';
import { FC } from 'react';
import { StyledSubmitButton } from '../../../components/Buttons/SubmitButton/StyledSubmitButton';
import FormInput from '../../../components/Inputs/FormInput/FormInput';
import { StyledFormTextarea } from '../../../components/Inputs/FormTextarea/StyledFormTextarea';
import { useNotifications } from '../../../hooks/useNotification';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Maybe } from '../../../shared/types/types';
import { solutionSchema } from '../../../shared/validation/validation';
import { AddSolutionDto, SolutionModel } from '../store/dto';
import * as Styles from './styledForm';
import { useFormikError } from '../../../hooks/useFormikError';

interface SolutionFormProps {
    addSolutionStatus: RequestStatus;
    onAddSolution: (solution: AddSolutionDto) => Promise<void>;
    onEditSolution: (solution: SolutionModel) => Promise<void>;
    onClearForm: () => void;
    selectedSolution: Maybe<SolutionModel>;
    onRefreshSolutions: () => Promise<void>;
}

export const SolutionForm: FC<SolutionFormProps> = ({
    addSolutionStatus,
    onAddSolution,
    onClearForm,
    selectedSolution,
    onRefreshSolutions,
    onEditSolution,
}) => {
    useNotifications(addSolutionStatus, 'Rozwiązanie dodane pomyślnie');
    console.log({ isPublic: selectedSolution?.isPublic });

    const formik = useFormik({
        initialValues: {
            title: selectedSolution?.title || '',
            description: selectedSolution?.description || '',
            content: selectedSolution?.content || '',
            isPublic: selectedSolution?.isPublic || false,
        },
        onSubmit: async (values, { resetForm }) => {
            const { title, description, content, isPublic } = values;
            const formData = {
                title,
                description,
                content,
                isPublic,
            };

            console.log(formData);

            if (selectedSolution) {
                await onEditSolution({ ...formData, id: selectedSolution.id });
            } else {
                await onAddSolution(formData);
            }

            onClearForm();
            await onRefreshSolutions();
            resetForm({});
        },
        validationSchema: solutionSchema,
        validateOnChange: false,
        enableReinitialize: true,
    });

    useFormikError(formik.errors);
    console.log(formik.values.isPublic);

    return (
        <Styles.solutionForm onSubmit={formik.handleSubmit}>
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
            <input type="checkbox" name="isPublic" onChange={formik.handleChange} checked={formik.values.isPublic} />
            <StyledSubmitButton type="submit">
                {selectedSolution ? 'Zapisz zmiany' : 'Dodaj zamknięcie'}
            </StyledSubmitButton>
        </Styles.solutionForm>
    );
};
