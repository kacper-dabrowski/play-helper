import styled from 'styled-components';

export const StyledButton = styled.button`
    width: 9rem;
    font-size: 1.2rem;
    margin-left: 1rem;
    margin-right: 1rem;
    height: 2.5rem;
    padding: 0.5rem;
    border-radius: 20px;
    background-color: #b3b3b3;
    border: none;
    transition: ease-in-out 0.2s;
    background-color: ${({ active }) => (active ? '#583787' : '#b3b3b3')};
    color: ${({ active }) => (active ? 'white' : 'black')};

    &:hover,
    &:active,
    &:focus {
        background-color: #583787;
        color: white;
        cursor: pointer;
    }
`;

export const SpecialButton = styled(StyledButton)`
    width: ${({ width }) => width};
    height: ${({ height }) => height};
    background-color: ${({ bgColor }) => bgColor};
    &:hover,
    &:active,
    &:focus {
        background-color: ${({ hoverBgColor }) => hoverBgColor};
        color: ${({ hoverColor }) => hoverColor};
    }
`;
