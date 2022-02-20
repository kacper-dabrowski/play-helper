import { useFormik } from 'formik';
import React from 'react';
import useFormikError from '../../../hooks/useFormikError';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import { srqSchema } from '../../../shared/validation/validation';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import FormInput from '../../Inputs/FormInput/FormInput';
import { StyledFormTextarea } from '../../Inputs/FormTextarea/StyledFormTextarea';
import Spinner from '../../UI/spinner/Spinner';
import { StyledFormContainer } from './StyledSrqForm';
import { toastProvider } from '../../../libs/toast';

const SrqForm = (props) => {
    const { requestHandler, isLoading } = useRequest(urls.srq, REQUEST_METHODS.PUT);
    const { entriesRefresh } = props;

    const onSubmit = async (values, resetForm) => {
        try {
            const { title, description, department, content } = values;

            const formData = {
                title,
                description,
                department,
                content,
            };

            await requestHandler(formData, () => urls.srq);

            toastProvider.success('SRQ dodane pomyślnie');
            resetForm();
            entriesRefresh?.();
        } catch (error) {
            toastProvider.error(error.message);
        }
    };

    const formik = useFormik({
        initialValues: {
            title: '',
            description: '',
            department: '',
            content: '',
        },
        validationSchema: srqSchema,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values, resetForm);
            entriesRefresh?.();
        },
        validateOnChange: false,
    });

    useFormikError(formik.errors, null);

    return (
        <StyledFormContainer onSubmit={formik.handleSubmit}>
            <FormInput
                autoFocus
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
            {isLoading ? <Spinner centered /> : <SubmitButton title="Dodaj SRQ" />}
        </StyledFormContainer>
    );
};

export default SrqForm;
