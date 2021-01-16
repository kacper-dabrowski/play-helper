import styled from "styled-components";

export const StyledFormInput = styled.input`
  position: relative;
  width: 80%;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 21px;
  color: white;
  border: none;
  padding: 0.5rem;
  &::-webkit-outer-spin-button,
  &::-webkit-inner-spin-button {
    -webkit-appearance: none;
    margin: 0;
  }
`;
export const FormInputWrapper = styled.div`
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
