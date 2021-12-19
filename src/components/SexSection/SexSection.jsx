import React from 'react';
import { Project, Salutation } from '../../shared/identifiers';
import { StateButton } from '../Buttons/StateButton/StateButton';

const SexSection = ({ setHandler, setting }) => (
    <>
        <StateButton
            variant={Project.Support}
            title="Mężczyzna"
            active={setting === Salutation.Man}
            onClick={() => setHandler(Salutation.Man)}
        />
        <StateButton
            variant={Project.Support}
            title="Kobieta"
            active={setting === Salutation.Woman}
            onClick={() => setHandler(Salutation.Woman)}
        />
        <StateButton
            variant={Project.Support}
            title="Spółka"
            active={setting === Salutation.Company}
            onClick={() => setHandler(Salutation.Company)}
        />
    </>
);

export default SexSection;
