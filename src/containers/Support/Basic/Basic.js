import React, { useState, useCallback } from "react";
import ConfirmButtons from "../../../components/ConfirmButtons/ConfirmButtons";
import ChannelSection from "./Sections/ChannelSection";
import SexSection from "../../../components/SexSection/SexSection";
import TextAreaSection from "./Sections/TextAreaSection";
import TypeSection from "./Sections/TypeSection";
import {
  SettingsSection,
  CheckboxContainer,
  AdditionalTemplateContainer,
} from "./StyledBasic";
import Checkbox from "../../../components/Checkbox/Checkbox";
import AdditionalTemplate from "../../../components/AdditionalTemplate/AdditionalTemplate";
import MainTextarea from "../../../components/MainTextarea/MainTextarea";
import {
  generateBasicTemplate,
  generateTelephoneTemplate,
} from "../../../modules/basic/basic";

const Basic = () => {
  const [template, setTemplate] = useState("");
  const [sex, setSex] = useState(null);
  const [type, setType] = useState(null);
  const [channel, setChannel] = useState(null);
  const [date, setDate] = useState(null);
  const [details, setDetails] = useState(null);
  const [general, setGeneral] = useState(null);
  const [hasOffer, setHasOffer] = useState(false);

  const generateTemplate = useCallback(() => {
    const templateConfig = {
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
  }, [sex, type, channel, date, details, general, hasOffer]);

  const generateAdditionalTemplate = () => {
    setTemplate(generateTelephoneTemplate());
  };

  const clearFields = useCallback(() => {
    setTemplate("");
    setSex("");
    setType("");
    setChannel("");
    setDate("");
    setDetails("");
    setGeneral("");
    setHasOffer(false);
  }, []);

  return (
    <>
      <div>
        <SettingsSection>
          <SexSection setHandler={setSex} setting={sex} />
          <ChannelSection setHandler={setChannel} setting={channel} />
          <TypeSection
            typeSetHandler={setType}
            dateSetHandler={setDate}
            setting={type}
            date={date}
          />
        </SettingsSection>
        <TextAreaSection
          generalSetHandler={setGeneral}
          general={general}
          detailsSetHandler={setDetails}
          details={details}
        />
        <CheckboxContainer>
          <Checkbox
            labelContent={"Zapytanie o ofertę"}
            setHandler={setHasOffer}
            value={hasOffer}
          />
        </CheckboxContainer>
        <AdditionalTemplateContainer>
          <AdditionalTemplate
            title={"Zamknięcie telefoniczne"}
            enabled
            onGenerateTemplate={generateAdditionalTemplate}
          />
        </AdditionalTemplateContainer>
        <ConfirmButtons
          onClearFields={clearFields}
          onGenerateTemplate={generateTemplate}
        />
      </div>
      <MainTextarea value={template} setTemplate={setTemplate} />
    </>
  );
};

export default Basic;
