import React from "react";
import BorderButton from "../../../components/BorderButton/BorderButton";
import PlayNextButton from "../../../components/PlayNextButton/PlayNextButton";
import { StyledPlayNextSettings } from "./StyledSettings";
import identifiers from "../../../shared/identifiers";
import { isPolish } from "../../../modules/next/next";
import { StyledConfirmButton } from "./StyledSettings";

const Settings = ({
  language,
  setLanguage,
  sex,
  setSex,
  activeTemplate,
  setActiveTemplate,
  onGenerateTemplate,
}) => {
  const languageToSet =
    language === identifiers.language.polish
      ? identifiers.language.english
      : identifiers.language.polish;
  const sexToSet =
    sex === identifiers.sex.woman ? identifiers.sex.man : identifiers.sex.woman;
  return (
    <StyledPlayNextSettings>
      <PlayNextButton
        active={activeTemplate === identifiers.nextTemplates.GREETING}
        title={"Przywitaj się"}
        onClick={() => setActiveTemplate(identifiers.nextTemplates.GREETING)}
      />
      <PlayNextButton
        active={activeTemplate === identifiers.nextTemplates.DELETE_ACCOUNT}
        title={"Usuń konto"}
        onClick={() =>
          setActiveTemplate(identifiers.nextTemplates.DELETE_ACCOUNT)
        }
      />
      <PlayNextButton
        active={activeTemplate === identifiers.nextTemplates.NOTIFICATION}
        title={"Zgłoszenie"}
        onClick={() =>
          setActiveTemplate(identifiers.nextTemplates.NOTIFICATION)
        }
      />
      <PlayNextButton
        active={activeTemplate === identifiers.nextTemplates.MIGRATION}
        title={"Migracja"}
        onClick={() => setActiveTemplate(identifiers.nextTemplates.MIGRATION)}
      />
      <PlayNextButton
        active={activeTemplate === identifiers.nextTemplates.ROAMING}
        title={"Roaming"}
        onClick={() => setActiveTemplate(identifiers.nextTemplates.ROAMING)}
      />
      <PlayNextButton
        active={activeTemplate === identifiers.nextTemplates.QOS}
        title={"QoS"}
        onClick={() => setActiveTemplate(identifiers.nextTemplates.QOS)}
      />
      <PlayNextButton
        active={activeTemplate === identifiers.nextTemplates.NO_RESPONSE}
        title={"Brak odpowiedzi"}
        onClick={() => setActiveTemplate(identifiers.nextTemplates.NO_RESPONSE)}
      />
      <PlayNextButton
        active={activeTemplate === identifiers.nextTemplates.END_CONVERSATION}
        title={"Zakończ rozmowę"}
        onClick={() =>
          setActiveTemplate(identifiers.nextTemplates.END_CONVERSATION)
        }
      />
      <PlayNextButton title={"+ Dopytaj"} />
      <PlayNextButton title={"+ Ocena pracy"} />
      <BorderButton
        title={sex === identifiers.sex.woman ? "Pani" : "Pan"}
        btnColor={sex === identifiers.sex.woman ? "pink" : "#0ff"}
        onClick={() => setSex(sexToSet)}
      />
      <BorderButton
        title={isPolish(language) ? "polski" : "angielski"}
        btnColor={isPolish(language) ? "#f66" : "#fada79"}
        onClick={() => setLanguage(languageToSet)}
      />
      <StyledConfirmButton onClick={onGenerateTemplate} />
    </StyledPlayNextSettings>
  );
};

export default Settings;
