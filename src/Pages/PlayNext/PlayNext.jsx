import React, { useState } from 'react';
import backgroundImage from '../../assets/backgrounds/play-next-wave.svg';
import MainTextarea from '../../components/Inputs/MainTextarea/MainTextarea';
import { generateNextTemplate, isPolish } from '../../modules/next/next';
import routes from '../../shared/routes';
import Settings from './Settings/Settings';
import { NextLayout } from '../../containers/layouts/NextLayout/NextLayout';
import { useStore } from '../../stores/stores';
import { Language, NextNotes, Salutation } from '../../shared/identifiers';

const PlayNext = () => {
    const { authStore } = useStore();
    const [language, setLanguage] = useState(Language.Polish);
    const [sex, setSex] = useState(Salutation.Man);
    const [template, setTemplate] = useState('');
    const [activeTemplate, setActiveTemplate] = useState('');

    const onGenerateTemplate = (type) => {
        setActiveTemplate(type);
        const templateToSet = generateNextTemplate(type, sex, language, authStore.user.fullName);
        setTemplate(templateToSet);
    };

    const addToCurrentTemplate = (type, currentLanguage) => {
        let templateToSet;
        switch (type) {
            case NextNotes.Ask:
                if (isPolish(currentLanguage)) {
                    templateToSet = `${template} Mogę jakoś jeszcze pomóc?`;
                } else {
                    templateToSet = `${template} Do you need my further assistance?`;
                }

                break;
            case NextNotes.JobEvaluation:
                if (isPolish(currentLanguage)) {
                    // eslint-disable-next-line max-len
                    templateToSet = `${template} Po zakończeniu rozmowy wyświetli się okno z prośbą o krótką ocenę mojej pracy. Będę wdzięczny za jej wypełnienie. `;
                } else {
                    // eslint-disable-next-line max-len
                    templateToSet = `${template} After our conversation you will be able to mark our conversation in a short poll. It would be great if you filled that.`;
                }
                break;
            default:
                throw new Error('Out of note types!');
        }
        setTemplate(templateToSet);
    };
    return (
        <NextLayout routes={routes.playNext} backgroundImage={backgroundImage}>
            <Settings
                language={language}
                setLanguage={setLanguage}
                sex={sex}
                setSex={setSex}
                activeTemplate={activeTemplate}
                setActiveTemplate={setActiveTemplate}
                onGenerateTemplate={onGenerateTemplate}
                addToCurrentTemplate={addToCurrentTemplate}
            />
            <MainTextarea value={template} setTemplate={setTemplate} />
        </NextLayout>
    );
};

export default PlayNext;
