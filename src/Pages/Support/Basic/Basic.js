import React, { useState } from 'react';
import { useFormik } from 'formik';
import cogoToast from 'cogo-toast';
import AdditionalTemplate from '../../../components/Buttons/AdditionalTemplate/AdditionalTemplate';
import ConfirmButtons from '../../../components/Buttons/ConfirmButtons/ConfirmButtons';
import Checkbox from '../../../components/Inputs/Checkbox/Checkbox';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import SexSection from '../../../components/SexSection/SexSection';
import { generateBasicTemplate, generateTelephoneTemplate } from '../../../modules/basic/basic';
import ChannelSection from './Sections/ChannelSection';
import TextAreaSection from './Sections/TextAreaSection';
import TypeSection from './Sections/TypeSection';
import { AdditionalTemplateContainer, CheckboxContainer, SettingsSection } from './StyledBasic';

const telephoneTemplate = generateTelephoneTemplate();

const Basic = ({ name }) => {
    const formik = useFormik({
        initialValues: {
            sex: '',
            type: '',
            channel: '',
            date: '',
            general: '',
            details: '',
            hasOffer: false,
        },
        onSubmit: (values) => {
            try {
                const templateConfig = {
                    name,
                    ...values,
                };

                const generatedTemplate = generateBasicTemplate(templateConfig);
                setTemplate(generatedTemplate);
            } catch (error) {
                cogoToast.error(error.message);
            }
        },
    });

    const [template, setTemplate] = useState('');

    const onClearFields = () => {
        formik.resetForm();
        setTemplate('');
    };

    return (
        <>
            <div>
                <SettingsSection>
                    <SexSection
                        setHandler={(value) => formik.setFieldValue('sex', value)}
                        setting={formik.values.sex}
                    />
                    <ChannelSection
                        setHandler={(value) => formik.setFieldValue('channel', value)}
                        setting={formik.values.channel}
                    />
                    <TypeSection
                        typeSetHandler={(value) => formik.setFieldValue('type', value)}
                        dateSetHandler={(value) => formik.setFieldValue('date', value)}
                        setting={formik.values.type}
                        date={formik.values.date}
                    />
                </SettingsSection>
                <TextAreaSection
                    generalSetHandler={(value) => formik.setFieldValue('general', value)}
                    general={formik.values.general}
                    detailsSetHandler={(value) => formik.setFieldValue('details', value)}
                    details={formik.values.details}
                />
                <CheckboxContainer>
                    <Checkbox
                        labelContent="Zapytanie o ofertę"
                        setHandler={(value) => formik.setFieldValue('hasOffer', value)}
                        value={formik.values.hasOffer}
                    />
                </CheckboxContainer>
                <AdditionalTemplateContainer>
                    <AdditionalTemplate title="Zamknięcie telefoniczne" enabled template={telephoneTemplate} />
                </AdditionalTemplateContainer>
                <ConfirmButtons onClearFields={onClearFields} onGenerateTemplate={formik.handleSubmit} />
            </div>
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};

export default Basic;
