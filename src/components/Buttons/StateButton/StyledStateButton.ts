import styled from '@emotion/styled';
import { BaseButton } from '../BaseButton/StyledBaseButton';
import { colors } from '../../../shared/colors';

interface StateButtonProps {
    active: boolean;
}

export const StyledPlayNextButton = styled(BaseButton)<StateButtonProps>`
    width: 10rem;
    margin: 0.5rem;
    background-color: ${({ active }) =>
        active ? colors.stateButtons.playNext.activeBackgroundColor : colors.backgroundGrey};
    color: ${({ theme }) => theme.fontColor.black};

    &:hover,
    &:active,
    &:focus {
        background-color: ${colors.stateButtons.playNext.activeBackgroundColor};
        transform: scale(1.1);
    }
`;

export const StyledSupportButton = styled(BaseButton)<StateButtonProps>`
    width: 9rem;
    margin: 0.5rem;
    background-color: ${({ active }) =>
        active ? colors.stateButtons.support.activeBackgroundColor : colors.backgroundGrey};
    color: ${({ active }) => (active ? 'white' : 'black')};

    &:hover,
    &:active,
    &:focus {
        background-color: ${colors.stateButtons.support.activeBackgroundColor};
        color: ${({ theme }) => theme.fontColor.primary};
    }
`;
