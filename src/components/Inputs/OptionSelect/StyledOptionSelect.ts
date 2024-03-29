import styled from 'styled-components';
import { colors } from '../../../shared/colors';

export const Select = styled.select`
    width: 30%;
    border: none;
    padding: 0.5rem;
    background-color: transparent;
    border-bottom: 1px solid ${colors.playPurple};
    color: ${({ theme }) => theme.fontColor.primary};
    cursor: pointer;

    & option {
        color: ${({ theme }) => theme.fontColor.primary};
        background-color: ${colors.mainBackground};
    }
`;
