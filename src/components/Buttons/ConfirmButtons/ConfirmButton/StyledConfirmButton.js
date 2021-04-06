import styled from 'styled-components';

export const StyledConfirmButton = styled.button`
    width: 10rem;
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 2.5rem;
    padding: 0.5rem;
    border-radius: 20px;
    background-color: #399547;
    border: none;
    transition: ease-in-out 0.2s;
    color: white;
    &:hover,
    &:active,
    &:focus {
        color: #399547;
        background-color: white;
        cursor: pointer;
    }
`;
