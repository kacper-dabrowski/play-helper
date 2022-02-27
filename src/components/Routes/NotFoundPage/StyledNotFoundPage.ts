import { Link } from 'react-router-dom';
import styled from 'styled-components';

export const StyledNotFoundPage = styled.div`
    position: fixed;
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    top: 0;
    left: 0;
    font-size: 1.5rem;
    z-index: 0;
    color: ${({ theme }) => theme.fontColor.primary};
    background-color: black;
`;

export const StyledNotFoundLink = styled(Link)`
    text-decoration: none;
    display: inline-block;
    color: pink;
`;
