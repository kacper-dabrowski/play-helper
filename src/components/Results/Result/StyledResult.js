import styled from 'styled-components';

export const StyledResultContainer = styled.button`
    background-color: transparent;
    width: 100%;
    color: ${({ theme }) => theme.fontColor.primary};
    max-height: 33.33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font: inherit;
    padding: 0;
    margin: 1rem auto;
    border: 1px solid white;
    position: relative;
    transition: ease-in-out 0.2s;
    border-radius: 5px;
    & p,
    h3 {
        width: 80%;
        display: block;
        text-overflow: ellipsis;
        overflow: hidden;
        white-space: nowrap;
    }
    &:hover,
    &:focus {
        background-color: ${({ theme }) => theme.fontColor.primary};
        color: black;
        ${({ clickable }) => clickable && `cursor: pointer;`}
    }
`;
