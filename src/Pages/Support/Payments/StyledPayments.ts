import styled from 'styled-components';
import { colors } from '../../../shared/colors';

export const PaymentsContainer = styled.div`
    display: grid;
    grid-template-areas:
        'spans inputs'
        'invoices buttons';
    justify-items: center;
    align-content: center;
`;

export const PaymentButtonContainer = styled.div`
    display: grid;
    height: 8rem;
    grid-template-columns: 1fr 1fr 1fr;
    grid-template-rows: 1fr 1fr;
    justify-self: center;
    align-self: center;

    & button {
        width: 80%;
        align-self: center;
        justify-self: center;
    }
`;

export const ButtonsContainer = styled.div`
    margin-top: 2rem;
`;

export const CalculatorWrapper = styled.div`
    display: flex;
    flex-direction: column;
    height: 30rem;
    justify-content: space-around;
`;

export const InvoicesTips = styled.div`
    top: 50%;
    left: 50%;
    width: 25rem;
    padding: 4rem 2rem;
    background-color: ${colors.mainBackground};
    border: 1px solid purple;
    position: absolute;
    display: flex;
    flex-direction: column;
    justify-content: center;
    z-index: 12;
`;
