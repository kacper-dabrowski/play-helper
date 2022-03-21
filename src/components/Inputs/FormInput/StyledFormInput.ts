import styled from '@emotion/styled';
import { colors } from '../../../shared/colors';

interface StyledInputProps {
    hasErrors?: boolean;
}

export const StyledFormInput = styled.input<StyledInputProps>`
    position: relative;
    width: 80%;
    height: 2rem;
    background-color: rgba(0, 0, 0, 0.8);
    font-size: 1.1rem;
    color: ${({ theme }) => theme.fontColor.primary};
    border: none;
    padding: 0.5rem;
    margin: 0.5rem auto;
    border-bottom: 1px solid ${({ hasErrors }) => (hasErrors ? 'red' : colors.borders.purple)};
    transition: ease-in-out 0.2s;
    &:hover,
    &:active,
    &:focus {
        border-bottom: 2px solid ${colors.borders.activeOceanic};
    }
`;
