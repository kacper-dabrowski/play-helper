import { Button } from '@chakra-ui/react';
import styled from '@emotion/styled';
import { colors } from '../../../shared/colors';

interface AdditionalTemplateButtonProps {
    enabled: boolean;
}

export const StyledAdditionalTemplate = styled(Button)<AdditionalTemplateButtonProps>`
    margin: ${({ theme }) => theme.spacing.large} auto;

    text-align: center;
    max-width: 100%;
    width: 15rem;

    &:hover {
        background-color: ${({ enabled }) => (enabled ? colors.allowedHover : colors.forbiddenHover)};
        cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
    }
`;
