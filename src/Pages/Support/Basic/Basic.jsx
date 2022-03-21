import { Box, HStack, SimpleGrid } from '@chakra-ui/react';
import { useFormik } from 'formik';
import React, { useState } from 'react';
import AdditionalTemplate from '../../../components/Buttons/AdditionalTemplate/AdditionalTemplate';
import ConfirmButtons from '../../../components/Buttons/ConfirmButtons/ConfirmButtons';
import Checkbox from '../../../components/Inputs/Checkbox/Checkbox';
import { MainTextarea } from '../../../components/Inputs/MainTextarea/MainTextarea';
import SexSection from '../../../components/SexSection/SexSection';
import { Card } from '../../../components/UI/card/card';
import { toastProvider } from '../../../libs/toast';
import { generateBasicTemplate, generateTelephoneTemplate } from '../../../modules/basic/basic';
import ChannelSection from './Sections/ChannelSection';
import TextAreaSection from './Sections/TextAreaSection';
import TypeSection from './Sections/TypeSection';

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
                toastProvider.error(error.message);
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
            <Card>
                <SimpleGrid columns={3} rows={3} py={2}>
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
                </SimpleGrid>
                <TextAreaSection
                    generalSetHandler={(value) => formik.setFieldValue('general', value)}
                    general={formik.values.general}
                    detailsSetHandler={(value) => formik.setFieldValue('details', value)}
                    details={formik.values.details}
                />
                <HStack py={2}>
                    <Checkbox
                        labelContent="Zapytanie o ofertę"
                        setHandler={(value) => formik.setFieldValue('hasOffer', value)}
                        value={formik.values.hasOffer}
                    />
                </HStack>
                <Box>
                    <AdditionalTemplate title="Zamknięcie telefoniczne" enabled template={telephoneTemplate} />
                </Box>
                <ConfirmButtons onClearFields={onClearFields} onGenerateTemplate={formik.handleSubmit} />
            </Card>
            <Box w="100%" py={10}>
                <MainTextarea value={template} setTemplate={setTemplate} />
            </Box>
        </>
    );
};

export default Basic;
