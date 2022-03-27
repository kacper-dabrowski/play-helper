import React from 'react';
import SupportInput from '../../../../components/Inputs/SupportInput/SupportInput';
import { DoubledNotificationType } from '../../../../shared/identifiers';
import { StyledInputSection } from '../StyledDouble';

const InputSection = ({ type, doubled, current, setDoubledHandler, setCurrentHandler }) => {
    let secondInput;
    switch (type) {
        case DoubledNotificationType.Closed:
            secondInput = (
                <SupportInput
                    onChange={(event) => setDoubledHandler(event.target.value)}
                    value={doubled}
                    labelContent="Numer zgłoszenia zamkniętego"
                    placeholder="Numer zamkniętego zgłoszenia"
                />
            );
            break;
        case DoubledNotificationType.Opened:
            secondInput = (
                <SupportInput
                    onChange={(event) => setDoubledHandler(event.target.value)}
                    value={doubled}
                    labelContent="Numer zgłoszenia otwartego"
                    placeholder="Numer otwartego zgłoszenia"
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
                placeholder="Numer Twojego zgłoszenia"
            />
            {secondInput}
        </StyledInputSection>
    );
};

export default InputSection;
