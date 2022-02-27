import styled from 'styled-components';
import { BaseButton } from '../BaseButton/StyledBaseButton';
import { colors } from '../../../shared/colors';

interface AdditionalTemplateButtonProps {
    enabled: boolean;
}

export const StyledAdditionalTemplate = styled(BaseButton)<AdditionalTemplateButtonProps>`
    background-color: ${({ enabled }) => (enabled ? colors.allowed : colors.forbidden)};
    margin: ${({ theme }) => theme.spacing.large} auto;
    color: ${({ theme }) => theme.fontColor.primary};
    text-align: center;
    max-width: 100%;
    width: 15rem;

    &:hover {
        background-color: ${({ enabled }) => (enabled ? colors.allowedHover : colors.forbiddenHover)};
        cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
    }
`;
