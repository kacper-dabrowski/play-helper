import { useFormik } from 'formik';
import { FC } from 'react';
import { StyledSubmitButton } from '../../../components/Buttons/SubmitButton/StyledSubmitButton';
import { useNotifications } from '../../../hooks/useNotification';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Maybe } from '../../../shared/types/types';
import { solutionSchema } from '../../../shared/validation/validation';
import { ModifySupportRequestDto, SupportRequestModel } from '../store/dto';
import { useFormikError } from '../../../hooks/useFormikError';
import * as Styles from '../../components/styles/styledForm';
import { Input } from '../../../stories/atoms/input/input';
import { TextArea } from '../../../stories/atoms/textarea/textarea';
import { Button, ButtonVariant } from '../../../stories/atoms/button/button';

interface SupportRequestFormProps {
    addSupportRequestStatus: RequestStatus;
    onAddSupportRequest: (supportRequest: SupportRequestModel) => Promise<void>;
    onEditSupportRequest: (supportRequest: ModifySupportRequestDto) => Promise<void>;
    onClearForm: () => void;
    selectedSupportRequest: Maybe<ModifySupportRequestDto>;
    onRefreshSupportRequest: () => Promise<void>;
}

export const SupportRequestForm: FC<SupportRequestFormProps> = ({
    addSupportRequestStatus,
    onAddSupportRequest,
    onClearForm,
    selectedSupportRequest,
    onRefreshSupportRequest,
    onEditSupportRequest,
}) => {
    useNotifications(addSupportRequestStatus, 'SRQ dodane pomyślnie');

    const formik = useFormik({
        initialValues: {
            title: selectedSupportRequest?.title || '',
            description: selectedSupportRequest?.description || '',
            content: selectedSupportRequest?.content || '',
            department: selectedSupportRequest?.department || '',
        },
        onSubmit: async (values, { resetForm }) => {
            const { title, description, content, department } = values;
            const formData = {
                title,
                description,
                content,
                department,
            };

            if (selectedSupportRequest) {
                await onEditSupportRequest({ ...formData, _id: selectedSupportRequest._id });
            } else {
                await onAddSupportRequest({ ...formData, _id: '' });
            }

            onClearForm();

            await onRefreshSupportRequest();

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
                placeholder="Tytuł SRQ"
            />
            <Input
                error={formik.errors.description}
                name="description"
                onChange={formik.handleChange}
                value={formik.values.description}
                placeholder="Opis SRQ"
            />
            <TextArea
                labelText="Treść SRQ"
                name="content"
                error={formik.errors.content}
                onChange={formik.handleChange}
                value={formik.values.content}
                placeholder="Treść SRQ"
            />
            <TextArea
                labelText="Treść SRQ"
                name="department"
                error={formik.errors.department}
                onChange={formik.handleChange}
                value={formik.values.department}
                placeholder="Dział, do którego trafia SRQ"
            />
            <Button variant={ButtonVariant.Submit}>{selectedSupportRequest ? 'Zapisz zmiany' : 'Dodaj SRQ'}</Button>
        </Styles.formContainer>
    );
};
