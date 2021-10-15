import styled from 'styled-components';
import { colors } from '../colors';

export const Wrapper = styled.div`
    width: 70%;
    height: 70%;
    background: linear-gradient(to right, #835cbc, #009688);
    padding: 3px;
    border-radius: 5px;
`;

export const Container = styled.div`
    width: 100%;
    height: 100%;
    background-color: ${colors.mainBackground};
`;
