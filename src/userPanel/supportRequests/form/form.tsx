import { Button, Textarea, VStack } from '@chakra-ui/react';
import { useFormik } from 'formik';
import { FC } from 'react';
import FormInput from '../../../components/Inputs/FormInput/FormInput';
import { Card } from '../../../components/UI/card/card';
import { useFormikError } from '../../../hooks/useFormikError';
import { useNotifications } from '../../../hooks/useNotification';
import { RequestStatus } from '../../../shared/requestStatus/requestStatus';
import { Maybe } from '../../../shared/types/types';
import { solutionSchema } from '../../../shared/validation/validation';
import { ModifySupportRequestDto, SupportRequestModel } from '../store/dto';

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
        <form onSubmit={formik.handleSubmit}>
            <Card>
                <FormInput
                    name="title"
                    hasErrors={!!formik.errors.title}
                    onChange={formik.handleChange}
                    value={formik.values.title}
                    placeholder="Tytuł SRQ"
                />
                <FormInput
                    hasErrors={!!formik.errors.description}
                    name="description"
                    onChange={formik.handleChange}
                    value={formik.values.description}
                    placeholder="Opis SRQ"
                />
                <Textarea
                    name="content"
                    onChange={formik.handleChange}
                    value={formik.values.content}
                    placeholder="Treść SRQ"
                />
                <Textarea
                    name="department"
                    onChange={formik.handleChange}
                    value={formik.values.department}
                    placeholder="Dział, do którego trafia SRQ"
                />
                <Button colorScheme={'purple'} type="submit">
                    {selectedSupportRequest ? 'Zapisz zmiany' : 'Dodaj SRQ'}
                </Button>
            </Card>
        </form>
    );
};
