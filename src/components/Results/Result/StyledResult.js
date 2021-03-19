import styled from 'styled-components';

export const StyledResultContainer = styled.button`
    background-color: transparent;
    width: 100%;
    color: white;
    max-height: 33.33%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    font: inherit;
    padding: 0;
    margin: 1rem auto;
    border: 1px solid ${({ isPublic }) => (isPublic ? 'lime' : 'white')};
    position: relative;
    transition: ease-in-out 0.2s;
    border-radius: 5px;

    &:hover,
    &:focus {
        background-color: white;
        color: black;
        ${({ clickable }) => clickable && `cursor: pointer;`}
    }
`;

export const ResultButtonWrapper = styled.div`
    display: flex;
    margin: 1rem auto;
    width: 100%;
    justify-content: space-around;
`;

export const ResultButton = styled.button`
    width: 8rem;
    height: 2rem;
    padding: 0.5rem;
    background: linear-gradient(45deg, #835cbc, #5b398d);
    border: none;
    border-radius: 5px;
    justify-self: center;
    color: white;
    transition: ease-in-out 0.2s;
    margin-top: 1rem;
    &:hover {
        cursor: pointer;
        transform: scale(1.1);
        background: linear-gradient(45deg, #5b398d, #835cbc);
    }
`;
