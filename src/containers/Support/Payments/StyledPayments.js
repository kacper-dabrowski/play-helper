import styled from "styled-components";

export const PaymentsContainer = styled.div`
  display: grid;
  grid-template-rows: 1fr 1fr 1fr;
  justify-items: center;
  align-content: center;
`;
export const PaymentButtonContainer = styled.div`
  display: grid;
  height: 10rem;
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
