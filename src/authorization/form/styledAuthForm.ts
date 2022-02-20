import styled from 'styled-components';
import * as GradientBorder from '../../shared/styles/GradientBorder';
import { colors } from '../../shared/colors';

export const Wrapper = styled(GradientBorder.Wrapper)``;

export const Container = styled(GradientBorder.Container)`
    background-color: ${colors.mainBackground};
    display: flex;
    flex-direction: column;
    align-items: center;
    padding: 2rem;
    border-radius: 5px;
`;

export const BreakRow = styled.div`
    width: 60%;
    border: 0.2px solid ${colors.playPurple};
    margin: 0.5rem 0;
`;

export const AuthForm = styled.form`
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;
