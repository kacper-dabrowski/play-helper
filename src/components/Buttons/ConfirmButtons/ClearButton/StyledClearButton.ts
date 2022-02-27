import styled from 'styled-components';
import { BaseButton } from '../../BaseButton/StyledBaseButton';
import { colors } from '../../../../shared/colors';

export const StyledClearButton = styled(BaseButton)`
    width: 10rem;
    margin: 0 ${({ theme }) => theme.spacing.medium};
    background-color: ${colors.forbidden};
    color: ${({ theme }) => theme.fontColor.primary};

    &:hover,
    &:active,
    &:focus {
        background-color: ${colors.forbiddenHover};
    }
`;
