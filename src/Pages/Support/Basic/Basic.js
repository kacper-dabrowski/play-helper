import React, { useCallback, useState } from 'react';
import AdditionalTemplate from '../../../components/AdditionalTemplate/AdditionalTemplate';
import Checkbox from '../../../components/Checkbox/Checkbox';
import ConfirmButtons from '../../../components/ConfirmButtons/ConfirmButtons';
import MainTextarea from '../../../components/MainTextarea/MainTextarea';
import SexSection from '../../../components/SexSection/SexSection';
import useFeedbackSnackbars from '../../../hooks/useFeedbackSnackbars';
import { generateBasicTemplate, generateTelephoneTemplate } from '../../../modules/basic/basic';
import ChannelSection from './Sections/ChannelSection';
import TextAreaSection from './Sections/TextAreaSection';
import TypeSection from './Sections/TypeSection';
import { AdditionalTemplateContainer, CheckboxContainer, SettingsSection } from './StyledBasic';

const telephoneTemplate = generateTelephoneTemplate();
const Basic = (props) => {
    const [template, setTemplate] = useState('');
    const [sex, setSex] = useState(null);
    const [type, setType] = useState(null);
    const [channel, setChannel] = useState(null);
    const [date, setDate] = useState(null);
    const [details, setDetails] = useState(null);
    const [general, setGeneral] = useState(null);
    const [hasOffer, setHasOffer] = useState(false);
    const [, setError] = useFeedbackSnackbars();

    const generateTemplate = useCallback(() => {
        try {
            const templateConfig = {
                name: props.name,
                sex,
                type,
                channel,
                date,
                general,
                details,
                hasOffer,
            };
            const generatedTemplate = generateBasicTemplate(templateConfig);
            setTemplate(generatedTemplate);
        } catch (error) {
            setError(error.message);
        }
    }, [sex, type, channel, date, details, general, hasOffer, props.name]);

    const clearFields = useCallback(() => {
        setTemplate('');
        setSex('');
        setType('');
        setChannel('');
        setDate('');
        setDetails('');
        setGeneral('');
        setHasOffer(false);
    }, []);
    return (
        <>
            <div>
                <SettingsSection>
                    <SexSection setHandler={setSex} setting={sex} />
                    <ChannelSection setHandler={setChannel} setting={channel} />
                    <TypeSection typeSetHandler={setType} dateSetHandler={setDate} setting={type} date={date} />
                </SettingsSection>
                <TextAreaSection
                    generalSetHandler={setGeneral}
                    general={general}
                    detailsSetHandler={setDetails}
                    details={details}
                />
                <CheckboxContainer>
                    <Checkbox labelContent="Zapytanie o ofertę" setHandler={setHasOffer} value={hasOffer} />
                </CheckboxContainer>
                <AdditionalTemplateContainer>
                    <AdditionalTemplate title="Zamknięcie telefoniczne" enabled template={telephoneTemplate} />
                </AdditionalTemplateContainer>
                <ConfirmButtons onClearFields={clearFields} onGenerateTemplate={generateTemplate} />
            </div>
            <MainTextarea value={template} setTemplate={setTemplate} />
        </>
    );
};

export default Basic;
