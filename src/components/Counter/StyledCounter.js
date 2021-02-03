import styled from 'styled-components';

export const StyledCounter = styled.button`
    align-self: center;
    justify-self: center;
    background-color: #b3b3b3;
    width: 2rem;
    height: 2rem;
    padding: 0.5rem;
    display: inline;
    font-weight: bold;
    border: none;
    border-radius: 1rem;
    transition: ease-in-out 0.2s;
    &:hover {
        background-color: #583787;
        color: white;
        cursor: pointer;
    }
`;
