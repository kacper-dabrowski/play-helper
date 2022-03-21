import styled from '@emotion/styled';
import { colors } from '../../../shared/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 0.5rem;
`;

export const Text = styled.p`
    color: ${({ theme }) => theme.fontColor.primary};
`;

export const Button = styled.button`
    font-size: 1rem;
    background-color: transparent;
    border: none;
    color: ${colors.navlinkActive};
    cursor: pointer;
    transition: ease-in-out 0.2s;

    &:hover {
        color: ${({ theme }) => theme.fontColor.primary};
    }
`;
