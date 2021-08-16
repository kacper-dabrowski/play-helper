import React, { useCallback, useState } from 'react';
import cogoToast from 'cogo-toast';
import AdditionalTemplate from '../../../components/Buttons/AdditionalTemplate/AdditionalTemplate';
import Checkbox from '../../../components/Inputs/Checkbox/Checkbox';
import ConfirmButtons from '../../../components/Buttons/ConfirmButtons/ConfirmButtons';
import MainTextarea from '../../../components/Inputs/MainTextarea/MainTextarea';
import SexSection from '../../../components/SexSection/SexSection';
import { generateBasicTemplate, generateTelephoneTemplate } from '../../../modules/basic/basic';
import ChannelSection from './Sections/ChannelSection';
import TextAreaSection from './Sections/TextAreaSection';
import TypeSection from './Sections/TypeSection';
import { AdditionalTemplateContainer, CheckboxContainer, SettingsSection } from './StyledBasic';
import basicActions from '../../../stores/basic/actionTypes';

const telephoneTemplate = generateTelephoneTemplate();

const Basic = (props) => {
    const { storeDispatch, storeValues } = props;

    const [template, setTemplate] = useState('');
    const [sex, setSex] = useState(storeValues.sex);
    const [type, setType] = useState(storeValues.type);
    const [channel, setChannel] = useState(storeValues.channel);
    const [date, setDate] = useState(storeValues.date);
    const [details, setDetails] = useState(storeValues.details);
    const [general, setGeneral] = useState(storeValues.general);
    const [hasOffer, setHasOffer] = useState(storeValues.hasOffer);

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

            delete templateConfig.name;

            storeDispatch({ type: basicActions.SET_FIELDS_VALUES, payload: templateConfig });
        } catch (error) {
            cogoToast.error(error.message);
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
        storeDispatch({ type: basicActions.CLEAR_FIELDS_VALUES });
    }, [storeDispatch]);

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
