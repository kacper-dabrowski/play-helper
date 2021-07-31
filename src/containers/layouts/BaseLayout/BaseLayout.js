import styled from 'styled-components';
import { colors } from '../../../shared/colors';

export const BaseLayout = styled.div`
    width: 100%;
    height: 100vh;
    background: ${colors.mainBackground} url(${(props) => props.backgroundImage});
    background-size: cover;
    color: white;
    overflow: hidden;
    z-index: 100;
`;
