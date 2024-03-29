import { NavLink } from 'react-router-dom';
import styled from 'styled-components';

interface TopbarNavlinkProps {
    width: string;
}

export const TopbarNavlink = styled(NavLink)<TopbarNavlinkProps>`
    width: ${({ width }) => width || '7rem'};
    height: 40px;
    padding: 0.5rem;
    background: transparent;
    border-radius: 5px;
    border: 1px solid white;
    justify-self: center;
    margin: ${({ theme }) => theme.spacing.medium};
    color: ${({ theme }) => theme.fontColor.primary};
    font-size: 1.1rem;
    transition: ease-in-out 0.2s;
    text-decoration: none;
    text-align: center;
    display: flex;
    justify-content: center;
    align-items: center;

    &:hover,
    &:active,
    &:focus {
        cursor: pointer;
        transform: scale(1.1);
        color: black;
        background-color: ${({ theme }) => theme.fontColor.primary};
    }
`;
