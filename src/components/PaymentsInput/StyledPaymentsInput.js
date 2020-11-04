import styled from "styled-components";

export const StyledPaymentsInput = styled.input`
  width: 80%;
  background-color: transparent;
  color: white;
  border: none;
  border-bottom: 1px solid #a98dd0;
  padding: 0.5rem;
`;
export const PaymentsInputWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 1fr;
  margin: 1rem auto;
  & label {
    align-self: center;
    justify-self: start;
  }
  & input {
    margin-left: 1rem;
    justify-self: center;
    align-self: center;
  }
`;
