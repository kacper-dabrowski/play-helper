import styled from 'styled-components';
import {BaseButton} from '../../BaseButton/StyledBaseButton';

export const StyledConfirmButton = styled(BaseButton)`
  width: 10rem;
  margin: 0 1rem;
  background-color: #399547;
  color: white;

  &:hover,
  &:active,
  &:focus {
    color: #399547;
    background-color: white;
  }
`;
