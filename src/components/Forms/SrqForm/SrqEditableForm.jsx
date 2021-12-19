import cogoToast from 'cogo-toast';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import srqFormContext from '../../../contexts/srqFormContext';
import useFocus from '../../../hooks/useFocus';
import useFormikError from '../../../hooks/useFormikError';
import { srqSchema } from '../../../shared/validation/validation';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import FormInput from '../../Inputs/FormInput/FormInput';
import { StyledFormTextarea } from '../../Inputs/FormTextarea/StyledFormTextarea';
import Spinner from '../../UI/Spinner/Spinner';
import { StyledFormContainer } from './StyledSrqForm';

const SrqEditableForm = ({ entriesRefresh, populatedFields, onSupportRequestUpdate, updateRequestStatus }) => {
    const focusRef = useFocus();
    const { setEditMode } = useContext(srqFormContext);

    const onSubmit = async (values, resetForm) => {
        try {
            const { title, description, department, content } = values;

            const formData = {
                title,
                description,
                department,
                content,
            };
            const { srqId } = populatedFields;

            await onSupportRequestUpdate({ srqId, ...formData });

            cogoToast.success('Pomyślnie zapisano zmiany');
            resetForm();
            entriesRefresh?.();
            setEditMode(false);
        } catch (error) {
            cogoToast.error(error.message);
        }
    };

    const formik = useFormik({
        enableReinitialize: true,
        initialValues: populatedFields,
        validationSchema: srqSchema,
        validateOnChange: false,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values, resetForm);
            entriesRefresh?.();
        },
    });

    useFormikError(formik.errors);

    return (
        <StyledFormContainer onSubmit={formik.handleSubmit}>
            <FormInput
                focusRef={focusRef}
                hasErrors={!!formik.errors.title}
                value={formik.values.title}
                onChange={formik.handleChange}
                name="title"
                placeholder="Tytuł SRQ"
            />
            <FormInput
                hasErrors={!!formik.errors.description}
                value={formik.values.description}
                onChange={formik.handleChange}
                name="description"
                placeholder="Opis SRQ"
            />
            <FormInput
                hasErrors={!!formik.errors.department}
                value={formik.values.department}
                onChange={formik.handleChange}
                name="department"
                placeholder="Dział, do którego trafia SRQ"
            />
            <StyledFormTextarea
                hasErrors={!!formik.errors.content}
                value={formik.values.content}
                onChange={formik.handleChange}
                name="content"
                placeholder="Treść formatki"
            />
            {updateRequestStatus.loading ? <Spinner centered /> : <SubmitButton title="Zapisz zmiany" />}
        </StyledFormContainer>
    );
};

export default SrqEditableForm;
