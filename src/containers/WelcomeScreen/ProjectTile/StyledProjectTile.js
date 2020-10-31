import styled from "styled-components";

export const StyledProjectTile = styled.div`
  background-color: ${({ color }) => color};
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
`;
export const ProjectIcon = styled.img`
  width: 6rem;
  height: 6rem;
`;
