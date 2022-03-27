import React, { FC, useState } from 'react';
import { useFormik } from 'formik';
import AdditionalTemplate from '../../../components/Buttons/AdditionalTemplate/AdditionalTemplate';
import ConfirmButtons from '../../../components/Buttons/ConfirmButtons/ConfirmButtons';
import Checkbox from '../../../components/Inputs/Checkbox/Checkbox';
import { MainTextarea } from '../../../components/Inputs/MainTextarea/MainTextarea';
import SexSection from '../../../components/SexSection/SexSection';
import ChannelSection from './Sections/ChannelSection';
import TextAreaSection from './Sections/TextAreaSection';
import TypeSection from './Sections/TypeSection';
import { AdditionalTemplateContainer, CheckboxContainer, SettingsSection } from './StyledBasic';
import { toastProvider } from '../../../libs/toast';
import { generateBasicTemplate, generateTelephoneTemplate } from '../../../templates/basic/template';
import { CustomerGender, CustomerType, NotificationChannel } from '../../../shared/identifiers';

const telephoneTemplate = generateTelephoneTemplate();

interface BasicFormProps {
    name: string;
}

const Basic: FC<BasicFormProps> = ({ name }) => {
    const formik = useFormik({
        initialValues: {
            gender: CustomerGender.NotSet,
            type: CustomerType.NotSet,
            channel: NotificationChannel.NotSet,
            date: '',
            notificationDescription: '',
            notificationDetails: '',
            hasOffer: false,
        },
        onSubmit: (values) => {
            try {
                const templateConfig = {
                    name,
                    ...values,
                };

                const generatedTemplate = generateBasicTemplate(name, templateConfig);
                setTemplate(generatedTemplate);
            } catch (error) {
                if (error instanceof Error) {
                    toastProvider.error(error.message);
                }
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
                    general={formik.values.n}
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
