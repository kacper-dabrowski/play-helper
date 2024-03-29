import styled from 'styled-components';
import { colors } from '../../../shared/colors';

export const ModalContainer = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.mainBackground};
`;

export const ModalWrapper = styled.div`
    width: 70%;
    height: 70%;
    opacity: 0;
    background: linear-gradient(to right, #835cbc, #009688);
    padding: 3px;
    border-radius: 5px;
    position: absolute;
    z-index: 11;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
`;
