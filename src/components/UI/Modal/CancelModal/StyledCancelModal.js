import styled from "styled-components";
import cancelIcon from "../../../../assets/icons/cancel.svg";
export const CancelModal = styled.div`
  width: 1.5rem;
  height: 1.5rem;
  position: absolute;
  top: 1rem;
  right: 1rem;
  background-image: url("${cancelIcon}");
  &:hover {
    cursor: pointer;
  }
`;
