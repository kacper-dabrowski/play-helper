import styled from 'styled-components';
import { BaseButton } from '../BaseButton/StyledBaseButton';
import { colors } from '../../../shared/colors';

export const StyledPlayNextButton = styled(BaseButton)`
    width: 10rem;
    margin: 0.5rem;
    background-color: ${({ active }) =>
        active ? colors.stateButtons.playNext.activeBackgroundColor : colors.backgroundGrey};

    &:hover,
    &:active,
    &:focus {
        background-color: ${colors.stateButtons.playNext.backgroundColor};
        transform: scale(1.1);
    }
`;

export const StyledSupportButton = styled(BaseButton)`
    width: 9rem;
    margin: 0.5rem;
    background-color: ${({ active }) =>
        active ? colors.stateButtons.support.activeBackgroundColor : colors.backgroundGrey};
    color: ${({ active }) => (active ? 'white' : 'black')};

    &:hover,
    &:active,
    &:focus {
        background-color: ${colors.stateButtons.support.activeBackgroundColor};
        color: white;
    }
`;
