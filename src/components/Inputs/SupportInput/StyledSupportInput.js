import styled from 'styled-components';

export const StyledSupportInput = styled.input`
    position: relative;
    height: 2rem;
    width: 80%;
    background-color: rgba(0, 0, 0, 0.2);
    color: white;
    border: none;
    padding: 0.5rem;
    &::-webkit-outer-spin-button,
    &::-webkit-inner-spin-button {
        -webkit-appearance: none;
        margin: 0;
    }
`;
