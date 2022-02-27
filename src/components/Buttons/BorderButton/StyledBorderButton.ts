import styled from 'styled-components';
import { BaseButton } from '../BaseButton/StyledBaseButton';

interface BorderButtonProps {
    btnColor: string;
}

export const StyledBorderButton = styled(BaseButton)<BorderButtonProps>`
    width: 10rem;
    color: black;
    margin: 0.5rem;
    background-color: ${(props) => props.btnColor};
    border: 2px solid ${(props) => props.btnColor};

    &:hover,
    &:active,
    &:focus {
        background-color: transparent;
        color: ${(props) => props.btnColor};
    }
`;
