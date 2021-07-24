import React from 'react';
import config from '../../shared/identifiers';
import { StateButton } from '../Buttons/StateButton/StateButton';

const SexSection = ({ setHandler, setting }) => (
    <>
        <StateButton
            variant={config.projects.SUPPORT}
            title="Mężczyzna"
            active={setting === config.sex.man}
            onClick={() => setHandler(config.sex.man)}
        />
        <StateButton
            variant={config.projects.SUPPORT}
            title="Kobieta"
            active={setting === config.sex.woman}
            onClick={() => setHandler(config.sex.woman)}
        />
        <StateButton
            variant={config.projects.SUPPORT}
            title="Spółka"
            active={setting === config.sex.company}
            onClick={() => setHandler(config.sex.company)}
        />
    </>
);

export default SexSection;
