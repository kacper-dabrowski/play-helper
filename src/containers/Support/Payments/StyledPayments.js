import styled from "styled-components";

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
  display: flex;
  flex-direction: column;
`;

export const ButtonsContainer = styled.div`
  margin-top: 2rem;
`;
