import React from 'react';
import SupportInput from '../../../../components/Inputs/SupportInput/SupportInput';
import config from '../../../../shared/identifiers';
import { StyledInputSection } from '../StyledDouble';

const InputSection = ({ type, doubled, current, setDoubledHandler, setCurrentHandler }) => {
    let secondInput;
    switch (type) {
        case config.double.closed:
            secondInput = (
                <SupportInput
                    onChange={(event) => setDoubledHandler(event.target.value)}
                    value={doubled}
                    labelContent="Numer zgłoszenia zamkniętego"
                />
            );
            break;
        case config.double.opened:
            secondInput = (
                <SupportInput
                    onChange={(event) => setDoubledHandler(event.target.value)}
                    value={doubled}
                    labelContent="Numer zgłoszenia otwartego"
                />
            );
            break;
        default:
            throw new Error('Double type is invalid');
    }
    return (
        <StyledInputSection>
            <SupportInput
                onChange={(event) => setCurrentHandler(event.target.value)}
                value={current}
                labelContent="Number zgłoszenia bieżącego"
            />
            {secondInput}
        </StyledInputSection>
    );
};

export default InputSection;
