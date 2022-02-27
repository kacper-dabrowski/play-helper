import styled from 'styled-components';
import { colors } from '../../../shared/colors';

export const StyledCheckbox = styled.input.attrs({ type: 'checkbox' })`
    &[type='checkbox'] {
        -webkit-appearance: none;
        height: 1rem;
        width: 1rem;
        cursor: pointer;
        position: relative;
        transition: 0.15s;
        border-radius: 21px;
        background-color: ${colors.forbidden};
        margin-left: 0.5rem;

        &:checked {
            animation: spring 1s;
            background-color: ${colors.allowed};
        }
        @keyframes spring {
            0% {
                transform: scale(1) translateY(0);
            }
            10% {
                transform: scale(1.2, 0.6);
            }
            30% {
                transform: scale(0.8, 1.1) translateY(-20px);
            }
            50% {
                transform: scale(1) translateY(0);
            }
            100% {
                transform: translateY(0);
            }
        }
    }
`;
