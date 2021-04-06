import styled from 'styled-components';

export const CounterButton = styled.button`
    margin-top: 0.5rem;
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
    &:hover,
    &:active,
    &:focus {
        background-color: #583787;
        color: white;
        cursor: pointer;
    }
`;

export const CounterWrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-content: center;
    justify-items: center;
    text-align: center;
    margin: auto;
`;
