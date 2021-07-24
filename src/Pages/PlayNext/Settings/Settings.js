import React from 'react';
import BorderButton from '../../../components/Buttons/BorderButton/BorderButton';
import {StyledPlayNextSettings} from './StyledSettings';
import config from '../../../shared/identifiers';
import {isPolish} from '../../../modules/next/next';
import {StateButton} from '../../../components/Buttons/StateButton/StateButton';

const Settings = ({language, setLanguage, sex, setSex, activeTemplate, onGenerateTemplate, addToCurrentTemplate}) => {
        const languageToSet = language === config.language.polish ? config.language.english : config.language.polish;
        const sexToSet = sex === config.sex.woman ? config.sex.man : config.sex.woman;

        return (
            <StyledPlayNextSettings>
                    <StateButton
                        variant={config.projects.NEXT}
                        active={activeTemplate === config.nextTemplates.GREETING}
                        title="Przywitaj się"
                        onClick={() => onGenerateTemplate(config.nextTemplates.GREETING)}
                    />
                    <StateButton
                        variant={config.projects.NEXT}
                        active={activeTemplate === config.nextTemplates.DELETE_ACCOUNT}
                        title="Usuń konto"
                        onClick={() => onGenerateTemplate(config.nextTemplates.DELETE_ACCOUNT)}
                    />
                    <StateButton
                        variant={config.projects.NEXT}
                        active={activeTemplate === config.nextTemplates.NOTIFICATION}
                        title="Zgłoszenie"
                        onClick={() => onGenerateTemplate(config.nextTemplates.NOTIFICATION)}
                    />
                    <StateButton
                        variant={config.projects.NEXT}
                        active={activeTemplate === config.nextTemplates.MIGRATION}
                        title="Migracja"
                        onClick={() => onGenerateTemplate(config.nextTemplates.MIGRATION)}
                    />
                    <StateButton
                        variant={config.projects.NEXT}
                        active={activeTemplate === config.nextTemplates.ROAMING}
                        title="Roaming"
                        onClick={() => onGenerateTemplate(config.nextTemplates.ROAMING)}
                    />
                    <StateButton
                        variant={config.projects.NEXT}
                        active={activeTemplate === config.nextTemplates.QOS}
                        title="QoS"
                        onClick={() => onGenerateTemplate(config.nextTemplates.QOS)}
                    />
                    <StateButton
                        variant={config.projects.NEXT}
                        active={activeTemplate === config.nextTemplates.NO_RESPONSE}
                        title="Brak odpowiedzi"
                        onClick={() => onGenerateTemplate(config.nextTemplates.NO_RESPONSE)}
                    />
                    <StateButton
                        variant={config.projects.NEXT}
                        active={activeTemplate === config.nextTemplates.END_CONVERSATION}
                        title="Zakończ rozmowę"
                        onClick={() => onGenerateTemplate(config.nextTemplates.END_CONVERSATION)}
                    />
                    <StateButton
                        variant={config.projects.NEXT}
                        title="+ Dopytaj"
                        onClick={() => addToCurrentTemplate(config.nextNotes.ASK, language)}
                    />
                    <StateButton
                        variant={config.projects.NEXT}
                        title="+ Ocena pracy"
                        onClick={() => addToCurrentTemplate(config.nextNotes.JOB_EVALUATION, language)}
                    />
                    <BorderButton
                        title={sex === config.sex.woman ? 'Pani' : 'Pan'}
                        btnColor={sex === config.sex.woman ? 'pink' : '#0ff'}
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
