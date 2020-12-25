import styled from "styled-components";
import backgroundImage from "../../assets/backgrounds/support-wave.svg";
export const StyledSupport = styled.div`
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
