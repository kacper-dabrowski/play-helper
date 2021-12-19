import React from 'react';
import BorderButton from '../../../components/Buttons/BorderButton/BorderButton';
import { StyledPlayNextSettings } from './StyledSettings';
import { Language, NextNotes, NextTemplateType, Project, Salutation } from '../../../shared/identifiers';
import { isPolish } from '../../../modules/next/next';
import { StateButton } from '../../../components/Buttons/StateButton/StateButton';

const Settings = ({ language, setLanguage, sex, setSex, activeTemplate, onGenerateTemplate, addToCurrentTemplate }) => {
    const languageToSet = language === Language.Polish ? Language.English : Language.Polish;
    const sexToSet = sex === Salutation.Woman ? Salutation.Man : Salutation.Woman;

    return (
        <StyledPlayNextSettings>
            <StateButton
                variant={Project.Next}
                active={activeTemplate === NextTemplateType.Greeting}
                title="Przywitaj się"
                onClick={() => onGenerateTemplate(NextTemplateType.Greeting)}
            />
            <StateButton
                variant={Project.Next}
                active={activeTemplate === NextTemplateType.DeleteAccount}
                onClick={() => onGenerateTemplate(NextTemplateType.DeleteAccount)}
                title="Usuń konto"
            />
            <StateButton
                variant={Project.Next}
                active={activeTemplate === NextTemplateType.Notification}
                onClick={() => onGenerateTemplate(NextTemplateType.Notification)}
                title="Zgłoszenie"
            />
            <StateButton
                variant={Project.Next}
                active={activeTemplate === NextTemplateType.Migration}
                onClick={() => onGenerateTemplate(NextTemplateType.Migration)}
                title="Migracja"
            />
            <StateButton
                variant={Project.Next}
                active={activeTemplate === NextTemplateType.Roaming}
                onClick={() => onGenerateTemplate(NextTemplateType.Roaming)}
                title="Roaming"
            />
            <StateButton
                variant={Project.Next}
                active={activeTemplate === NextTemplateType.QoS}
                onClick={() => onGenerateTemplate(NextTemplateType.QoS)}
                title="QoS"
            />
            <StateButton
                variant={Project.Next}
                active={activeTemplate === NextTemplateType.NoResponse}
                onClick={() => onGenerateTemplate(NextTemplateType.NoResponse)}
                title="Brak odpowiedzi"
            />
            <StateButton
                variant={Project.Next}
                active={activeTemplate === NextTemplateType.EndConversation}
                onClick={() => onGenerateTemplate(NextTemplateType.EndConversation)}
                title="Zakończ rozmowę"
            />
            <StateButton
                variant={Project.Next}
                title="+ Dopytaj"
                onClick={() => addToCurrentTemplate(NextNotes.Ask, language)}
            />
            <StateButton
                variant={Project.Next}
                title="+ Ocena pracy"
                onClick={() => addToCurrentTemplate(NextNotes.JobEvaluation.JOB_EVALUATION, language)}
            />
            <BorderButton
                title={sex === Salutation.Woman ? 'Pani' : 'Pan'}
                btnColor={sex === Salutation.Woman ? 'pink' : '#0ff'}
                onClick={() => setSex(sexToSet)}
            />
            <BorderButton
                title={isPolish(language) ? 'polski' : 'angielski'}
                btnColor={isPolish(language) ? '#f66' : '#fada79'}
                onClick={() => setLanguage(languageToSet)}
            />
        </StyledPlayNextSettings>
    );
};

export default Settings;
