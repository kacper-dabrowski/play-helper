import styled from "styled-components";
import ConfirmButton from "../../../components/ConfirmButtons/ConfirmButton/ConfirmButton";

export const StyledPlayNextSettings = styled.div`
  display: grid;
  width: 60%;
  grid-template-columns: 1fr 1fr;
  align-content: center;
  justify-items: center;
`;
export const StyledConfirmButton = styled(ConfirmButton)`
  margin: 1rem;
  width: 80%;
  background-color: #399547;
  grid-column: 1/3;
`;
