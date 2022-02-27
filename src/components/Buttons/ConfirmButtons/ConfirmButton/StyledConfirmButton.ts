import styled from 'styled-components';
import { BaseButton } from '../../BaseButton/StyledBaseButton';
import { colors } from '../../../../shared/colors';

export const StyledConfirmButton = styled(BaseButton)`
    width: 10rem;
    margin: 0 1rem;
    background-color: ${colors.allowed};
    color: ${({ theme }) => theme.fontColor.primary};

    &:hover,
    &:active,
    &:focus {
        color: ${colors.allowed};
        background-color: ${({ theme }) => theme.fontColor.primary};
    }
`;
