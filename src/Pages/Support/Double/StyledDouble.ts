import styled from 'styled-components';
import config from '../../../shared/identifiers';

export const StyledInputSection = styled.div`
    display: grid;
    grid-template-columns: 1fr 1fr;
    grid-template-rows: 80px 80px;
    justify-items: center;
    align-items: center;
    width: 80%;
`;

export const StyledSexSection = styled.div`
    display: grid;
    width: 80%;
    justify-content: center;
    align-items: center;
    grid-template-columns: 10rem 10rem 10rem;
    grid-template-rows: 100px;
`;
export const ConfirmButtonsWrapper = styled.div`
    width: 80%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    margin: ${({ theme }) => theme.spacing.medium} 0;
`;

interface DoubleContainerProps {
    type: string;
}

export const DoubleContainer = styled.div<DoubleContainerProps>`
    margin-top: ${({ type }) => type === config.double.opened && '100px'};
`;
