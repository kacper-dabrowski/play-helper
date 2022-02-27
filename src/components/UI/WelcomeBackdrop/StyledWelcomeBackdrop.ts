import styled from 'styled-components';
import { fadeIn } from '../../../shared/styles/animations/fadeIn';

export const Container = styled.div`
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    z-index: 11;
    left: 50%;
    top: 10%;
    transform: translate(-50%, 0);
`;

export const Header = styled.h1`
    color: ${({ theme }) => theme.fontColor.primary};
    animation: fadeIn 2s ease-in-out forwards;
    z-index: 11;
    text-align: center;

    ${fadeIn}
`;

export const Subheader = styled.h2`
    color: ${({ theme }) => theme.fontColor.primary};
    z-index: 11;
    animation: fadeIn ease-in-out 2s forwards;
    animation-delay: 1s;
    text-align: center;
    opacity: 0;
    margin-bottom: ${({ theme }) => theme.spacing.large};
    ${fadeIn}
`;
