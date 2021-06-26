import cogoToast from 'cogo-toast';
import { useFormik } from 'formik';
import React, { useContext } from 'react';
import * as Yup from 'yup';
import srqFormContext from '../../../contexts/srqFormContext';
import useError from '../../../hooks/useError';
import useFocus from '../../../hooks/useFocus';
import useRequest, { REQUEST_METHODS } from '../../../hooks/useRequest';
import urls from '../../../shared/urls';
import SubmitButton from '../../Buttons/SubmitButton/SubmitButton';
import FormInput from '../../Inputs/FormInput/FormInput';
import { StyledFormTextarea } from '../../Inputs/FormTextarea/StyledFormTextarea';
import Spinner from '../../UI/Spinner/Spinner';
import { StyledFormContainer } from './StyledSrqForm';

const validationSchema = Yup.object({
    title: Yup.string().required('Pole jest wymagane'),
    description: Yup.string().required('Pole jest wymagane'),
    department: Yup.string().required('Pole jest wymagane'),
    content: Yup.string().required('Pole jest wymagane'),
});

const SrqEditableForm = (props) => {
    const { isLoading, requestHandler } = useRequest(urls.srq, REQUEST_METHODS.POST);
    const focusRef = useFocus();
    const { setEditMode } = useContext(srqFormContext);

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

            await requestHandler(formData, () => `${urls.srq}/${props.populatedFields.srqId}`);

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
        initialValues: props.populatedFields,
        validationSchema,
        validateOnChange: false,
        onSubmit: (values, { resetForm }) => {
            onSubmit(values, resetForm);
            entriesRefresh?.();
        },
    });

    useError(formik.errors);

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
            {isLoading ? <Spinner centered /> : <SubmitButton title="Zapisz zmiany" />}
        </StyledFormContainer>
    );
};

export default SrqEditableForm;
