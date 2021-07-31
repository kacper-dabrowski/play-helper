import styled from 'styled-components';
import { BaseButton } from '../BaseButton/StyledBaseButton';
import { colors } from '../../../shared/colors';

export const StyledAdditionalTemplate = styled(BaseButton)`
    background-color: ${({ enabled }) => (enabled ? colors.allowed : colors.forbidden)};
    margin: 1rem auto;
    color: white;
    text-align: center;
    max-width: 100%;
    width: 15rem;

    &:hover {
        background-color: ${({ enabled }) => (enabled ? colors.allowedHover : colors.forbiddenHover)};
        cursor: ${({ enabled }) => (enabled ? 'pointer' : 'not-allowed')};
    }
`;
