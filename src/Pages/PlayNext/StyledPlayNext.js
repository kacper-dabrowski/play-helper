import styled from 'styled-components';
import { StyledConfirmButton } from '../../components/ConfirmButtons/ConfirmButton/StyledConfirmButton';
import MainTextarea from '../../components/MainTextarea/MainTextarea';

export const PlayNextTextArea = styled(MainTextarea)`
    height: 40%;
    font-size: 1.1rem;
    & ${StyledConfirmButton} {
        background-color: #399547;
    }
`;
