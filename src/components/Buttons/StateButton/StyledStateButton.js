import styled from 'styled-components';
import {BaseButton} from '../BaseButton/StyledBaseButton';

export const StyledPlayNextButton = styled(BaseButton)`
  width: 10rem;
  margin: 0.5rem;
  background-color: ${({active}) => (active ? '#f7be16' : '#b3b3b3')};

  &:hover,
  &:active,
  &:focus {
    background-color: #f7be16;
    transform: scale(1.1);
  }
`;

export const StyledSupportButton = styled(BaseButton)`
  width: 9rem;
  margin: 0.5rem;
  background-color: ${({active}) => (active ? '#583787' : '#b3b3b3')};
  color: ${({active}) => (active ? 'white' : 'black')};

  &:hover,
  &:active,
  &:focus {
    background-color: #583787;
    color: white;
  }
`;
