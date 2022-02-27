import styled from 'styled-components';
import { colors } from '../../shared/colors';

export const CounterButton = styled.button`
    margin-top: 0.5rem;
    align-self: center;
    justify-self: center;
    background-color: ${colors.backgroundGrey};
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
        background-color: ${colors.stateButtons.support.activeBackgroundColor};
        color: ${({ theme }) => theme.fontColor.primary};
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
