import styled from 'styled-components';
import { BaseButton } from '../BaseButton/StyledBaseButton';
import { colors } from '../../../shared/colors';

interface StateButtonProps {
    active: boolean;
}

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
