import styled from 'styled-components';
import { BaseButton } from '../../BaseButton/StyledBaseButton';

export const StyledClearButton = styled(BaseButton)`
    width: 10rem;
    margin: 0 1rem;
    background-color: #fa7f72;
    color: white;

    &:hover,
    &:active,
    &:focus {
        background-color: #bb2205;
    }
`;
