import { useFormik } from 'formik';
import { FC } from 'react';
// import { StyledSubmitButton } from '../../../components/Buttons/SubmitButton/StyledSubmitButton';
import { useNotifications } from '../../../hooks/useNotification';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Maybe } from '../../../shared/types/types';
import { solutionSchema } from '../../../shared/validation/validation';
import { AddSolutionDto, SolutionModel } from '../store/dto';
import * as Styles from '../../components/styles/styledForm';
import { useFormikError } from '../../../hooks/useFormikError';
import { Input } from '../../../stories/atoms/input/input';
import { TextArea } from '../../../stories/atoms/textarea/textarea';
import { Button, ButtonVariant } from '../../../stories/atoms/button/button';

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

    return (
        <Styles.formContainer onSubmit={formik.handleSubmit}>
            <Input
                name="title"
                error={formik.errors.title}
                onChange={formik.handleChange}
                value={formik.values.title}
                placeholder="Tytuł zamknięcia"
            />
            <Input
                error={formik.errors.description}
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Opis zamknięcia"
            />
            <TextArea
                labelText={'Treść zamknięcia'}
                name="content"
                error={formik.errors.content}
                onChange={formik.handleChange}
                value={formik.values.content}
                placeholder="Szanowni państwo..."
            />
            <label htmlFor="isPublic">Widok publiczny: </label>
            <input
                type="checkbox"
                name="isPublic"
                onChange={formik.handleChange}
                checked={formik.values.isPublic}
                data-testid="is-public-checkbox"
            />
            <Button variant={ButtonVariant.Submit} type="submit">
                {selectedSolution ? 'Zapisz zmiany' : 'Dodaj zamknięcie'}
            </Button>
        </Styles.formContainer>
    );
};
