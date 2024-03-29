import styled from 'styled-components';
import { colors } from '../../../shared/colors';

export const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    width: 100%;
    height: 100%;
    background-color: ${colors.mainBackground};
`;
