import React, { useState } from 'react';
import { connect } from 'react-redux';
import Settings from './Settings/Settings';
import { PlayNextTextArea } from './StyledPlayNext';
import identifiers from '../../shared/identifiers';
import { generateNextTemplate, isPolish } from '../../modules/next/next';
import backgroundImage from '../../assets/backgrounds/play-next-wave.svg';
import routes from '../../shared/routes';
import SupportLayout from '../../containers/layouts/SupportLayout/SupportLayout';

const PlayNext = ({ username }) => {
    const [language, setLanguage] = useState(identifiers.language.polish);
    const [sex, setSex] = useState(identifiers.sex.man);
    const [template, setTemplate] = useState('');
    const [activeTemplate, setActiveTemplate] = useState('');

    const onGenerateTemplate = (type) => {
        setActiveTemplate(type);
        const templateToSet = generateNextTemplate(type, sex, language, username);
        setTemplate(templateToSet);
    };

    const addToCurrentTemplate = (type, currentLanguage) => {
        let templateToSet;
        switch (type) {
            case identifiers.nextNotes.ASK:
                if (isPolish(currentLanguage)) {
                    templateToSet = `${template} Mogę jakoś jeszcze pomóc?`;
                } else {
                    templateToSet = `${template} Do you need my further assistance?`;
                }

                break;
            case identifiers.nextNotes.JOB_EVALUATION:
                if (isPolish(currentLanguage)) {
                    templateToSet = `${template} Po zakończeniu rozmowy wyświetli się okno z prośbą o krótką ocenę mojej pracy. Będę wdzięczny za jej wypełnienie. `;
                } else {
                    templateToSet = `${template} After our conversation you will be able to mark our conversation in a short poll. It would be great if you filled that.`;
                }
                break;
            default:
                throw new Error('Out of note types!');
        }
        setTemplate(templateToSet);
    };
    return (
        <SupportLayout routes={routes.playNext} backgroundImage={backgroundImage}>
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
            <PlayNextTextArea value={template} setTemplate={setTemplate} />
        </SupportLayout>
    );
};

const mapStateToProps = (state) => ({
    username: state.auth.fullName,
});

export default connect(mapStateToProps, null)(PlayNext);
