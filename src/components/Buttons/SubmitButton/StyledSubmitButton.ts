import styled from 'styled-components';
import { colors } from '../../../shared/colors';

export const StyledSubmitButton = styled.button`
    width: 10rem;
    height: 2rem;
    padding: 0.5rem;
    background: linear-gradient(45deg, #835cbc, #5b398d);
    border: none;
    border-radius: 5px;
    justify-self: center;
    color: ${({ theme }) => theme.fontColor.primary};
    transition: ease-in-out 0.2s;
    margin-top: ${({ theme }) => theme.spacing.medium};

    &:disabled {
        background: ${colors.grayedPurple};
        cursor: not-allowed;
    }
    &:hover:not(:disabled),
    &:active:not(:disabled),
    &:focus:not(:disabled) {
        cursor: pointer;
        transform: scale(1.1);
    }
`;
