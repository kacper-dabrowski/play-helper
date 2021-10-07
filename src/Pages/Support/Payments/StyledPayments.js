import styled from 'styled-components';
import { colors } from '../../../shared/colors';

export const PaymentsContainer = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
    grid-template-rows: 1fr 1fr 1fr;
    justify-items: center;
    align-content: center;
`;
export const PaymentButtonContainer = styled.div`
    display: grid;
    height: 8rem;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-items: center;
    align-content: center;
    & button {
        width: 80%;
        align-self: center;
        justify-self: center;
    }
`;

export const InvoicesContainer = styled.div`
    width: 80%;
    height: 200px;
    display: flex;
    flex-direction: column;
`;

export const ButtonsContainer = styled.div`
    margin-top: 2rem;
`;

export const CalculatorWrapper = styled.div`
    display: grid;
    height: 30%;
    align-items: center;
`;

export const InvoicesTips = styled.div`
    width: 25rem;
    padding: 4rem;
    background-color: ${colors.mainBackground};
    border: 1px solid purple;
    position: absolute;
    display: flex;
    justify-content: center;
    z-index: 12;
    transform: 0;

    & div {
        width: 20rem;
    }
`;
