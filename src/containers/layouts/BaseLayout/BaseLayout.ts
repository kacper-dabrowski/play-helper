import styled from '@emotion/styled';
import { colors } from '../../../shared/colors';

interface BaseLayoutProps {
    backgroundImage: string;
}

export const BaseLayout = styled.div<BaseLayoutProps>`
    width: 100%;
    height: 100vh;
    background: ${colors.mainBackground} url(${(props) => props.backgroundImage});
    background-size: cover;
    color: ${({ theme }) => theme.fontColor.primary};
    overflow: hidden;
    z-index: 100;
`;
