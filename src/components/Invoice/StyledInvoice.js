import styled from "styled-components";

export const StyledInvoice = styled.div`
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 3rem;
  margin: 0.5rem auto;
  background-color: #7046ab;
  box-shadow: 17px 10px 42px 0px rgba(0, 0, 0, 0.75);
  border-radius: 21px;
  & img {
    justify-self: flex-end;
    align-self: center;
    margin-right: 1rem;
  }
`;
