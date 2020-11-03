import styled from "styled-components";

export const StyledInputSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-template-rows: 80px 80px;
  justify-items: center;
  align-content: center;
  width: 80%;
  & label {
    align-self: center;
    justify-self: center;
  }
`;

export const StyledSexSection = styled.div`
  display: grid;
  justify-content: center;
  align-items: center;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 100px;
`;
export const ConfirmButtonsWrapper = styled.div`
  width: 90%;
  display: flex;
  justify-content: space-around;
  align-items: center;

  margin: 1rem 1rem 0 1rem;
`;
