import styled from "styled-components";
import backgroundImage from "../../assets/backgrounds/play-next-wave.svg";

import { StyledConfirmButton } from "../../components/ConfirmButtons/ConfirmButton/StyledConfirmButton";
import MainTextarea from "../../components/MainTextarea/MainTextarea";
export const StyledPlayNext = styled.div`
  width: 100%;
  height: 100vh;
  background: #303030 url(${backgroundImage});
  background-size: cover;
  color: white;
  overflow: hidden;
`;

export const Container = styled.div`
  width: 80%;
  height: calc(100% - 120px);
  display: grid;
  padding: 1rem;
  text-align: center;
  margin: auto;
  grid-template-columns: 1fr 1fr;
`;

export const PlayNextTextArea = styled(MainTextarea)`
  height: 40%;

  font-size: 1.1rem;
  & ${StyledConfirmButton} {
    background-color: #399547;
  }
`;
// #399547
